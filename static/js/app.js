"use strict";

let products = [];
const config = {
    categories: [],
    cloneRoot: document.querySelector('meta[name="clone-root"]').content,
    csrfToken: document.querySelector('meta[name="csrf-token"]').content,
};

const elements = {
    shell: document.getElementById("app-shell"),
    productGrid: document.getElementById("product-grid"),
    emptyState: document.getElementById("empty-state"),
    search: document.getElementById("catalogue-search"),
    resultCount: document.getElementById("result-count"),
    activeFilterChip: document.getElementById("active-filter-chip"),
    clearFilter: document.getElementById("clear-filter"),
    resetResults: document.getElementById("reset-results"),
    emptyReset: document.getElementById("empty-reset"),
    categoryFilters: document.getElementById("category-filters"),
    favouriteCount: document.getElementById("favourite-count"),
    detailPanel: document.getElementById("detail-panel"),
    detailContent: document.getElementById("detail-content"),
    closeDetail: document.getElementById("close-detail"),
    cloneDialog: document.getElementById("clone-dialog"),
    cloneIcon: document.getElementById("clone-icon"),
    cloneTitle: document.getElementById("clone-title"),
    cloneStrapline: document.getElementById("clone-strapline"),
    cloneTarget: document.getElementById("clone-target"),
    downloadZip: document.getElementById("download-zip"),
    confirmClone: document.getElementById("confirm-clone"),
    cloneStatus: document.getElementById("clone-status"),
    toastRegion: document.getElementById("toast-region"),
};

const state = {
    query: "",
    category: null,
    view: "all",
    selectedId: null,
    cloneProductId: null,
    favourites: new Set(),
};

function loadFavourites() {
    try {
        const stored = JSON.parse(localStorage.getItem("ai-catalogue-favourites") || "[]");
        const validIds = new Set(products.map((product) => product.id));
        return new Set(stored.filter((id) => validIds.has(id)));
    } catch {
        return new Set();
    }
}

function saveFavourites() {
    localStorage.setItem(
        "ai-catalogue-favourites",
        JSON.stringify(Array.from(state.favourites)),
    );
}

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

function productById(productId) {
    return products.find((product) => product.id === productId);
}

function normalise(value) {
    return String(value).toLocaleLowerCase().trim();
}

function searchableText(product) {
    return normalise([
        product.title,
        product.strapline,
        product.summary,
        ...product.categories,
        ...product.capabilities,
        ...product.stack,
        ...product.data_inputs,
    ].join(" "));
}

function filteredProducts() {
    const query = normalise(state.query);
    return products.filter((product) => {
        const matchesQuery = !query || searchableText(product).includes(query);
        const matchesCategory = !state.category || product.categories.includes(state.category);
        const matchesView = state.view === "all" || state.favourites.has(product.id);
        return matchesQuery && matchesCategory && matchesView;
    });
}

function makeTag(label, accent) {
    const tag = createElement("span", "tag", label);
    tag.style.setProperty("--tag-color", accent);
    return tag;
}

function makeProductIcon(product, extraClass = "") {
    const icon = createElement(
        "div",
        `product-icon ${extraClass}`.trim(),
        product.short_name,
    );
    icon.style.setProperty("--accent", product.accent);
    return icon;
}

function makeProductCard(product) {
    const card = createElement("article", "product-card");
    card.style.setProperty("--accent", product.accent);
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${product.title}`);

    const topLine = createElement("div", "card-topline");
    topLine.append(makeProductIcon(product));

    const favourite = createElement(
        "button",
        `favourite-button${state.favourites.has(product.id) ? " active" : ""}`,
        state.favourites.has(product.id) ? "★" : "☆",
    );
    favourite.type = "button";
    favourite.setAttribute(
        "aria-label",
        state.favourites.has(product.id)
            ? `Remove ${product.title} from favourites`
            : `Add ${product.title} to favourites`,
    );
    favourite.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleFavourite(product.id);
    });
    topLine.append(favourite);

    card.append(topLine);
    card.append(createElement("h2", "card-title", product.title));
    card.append(createElement("p", "card-strapline", product.strapline));
    card.append(createElement("p", "card-summary", product.summary));

    const footer = createElement("div", "card-footer");
    const tags = createElement("div", "tag-list");
    product.categories.slice(0, 2).forEach((category) => {
        tags.append(makeTag(category, product.accent));
    });
    footer.append(tags);

    const meta = createElement("div", "card-meta");
    const readiness = createElement("span", "readiness", product.readiness);
    readiness.style.setProperty("--accent", product.accent);
    meta.append(readiness);
    meta.append(createElement("span", "view-link", "VIEW PRODUCT  →"));
    footer.append(meta);
    card.append(footer);

    const open = () => selectProduct(product.id);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            open();
        }
    });
    return card;
}

function renderProducts() {
    const matches = filteredProducts();
    elements.productGrid.replaceChildren(...matches.map(makeProductCard));
    elements.productGrid.hidden = matches.length === 0;
    elements.emptyState.hidden = matches.length !== 0;

    elements.resultCount.textContent = `${matches.length} ${matches.length === 1 ? "RESULT" : "RESULTS"}`;
    elements.favouriteCount.textContent = String(state.favourites.size);

    elements.activeFilterChip.hidden = !state.category;
    elements.activeFilterChip.textContent = state.category || "";
    elements.clearFilter.hidden = !state.category;
    elements.resetResults.hidden = !state.category && !state.query;

    document.querySelectorAll("[data-view]").forEach((button) => {
        button.classList.toggle("active", button.dataset.view === state.view);
    });
    document.querySelectorAll("[data-category]").forEach((button) => {
        const value = button.dataset.category || null;
        button.classList.toggle("active", value === state.category);
    });
}

function renderCategoryFilters() {
    const fragment = document.createDocumentFragment();
    const categories = [null, ...config.categories];

    categories.forEach((category) => {
        const button = createElement("button", "filter-button");
        button.type = "button";
        button.dataset.category = category || "";

        const label = createElement("span", "", category || "All types");
        const count = category
            ? products.filter((product) => product.categories.includes(category)).length
            : products.length;
        button.append(label, createElement("span", "filter-count", String(count)));
        button.addEventListener("click", () => {
            state.category = category;
            renderProducts();
        });
        fragment.append(button);
    });

    elements.categoryFilters.replaceChildren(fragment);
}

function toggleFavourite(productId) {
    if (state.favourites.has(productId)) {
        state.favourites.delete(productId);
        showToast("Removed from favourites");
    } else {
        state.favourites.add(productId);
        showToast("Added to favourites");
    }
    saveFavourites();
    renderProducts();
    if (state.selectedId === productId) {
        renderDetails(productById(productId));
    }
}

function detailSection(title, content) {
    const section = createElement("section", "detail-section");
    section.append(createElement("span", "section-label", title));
    section.append(content);
    return section;
}

function tagList(values, accent) {
    const list = createElement("div", "tag-list");
    values.forEach((value) => list.append(makeTag(value, accent)));
    return list;
}

function renderDetails(product) {
    if (!product) {
        return;
    }

    const content = document.createDocumentFragment();
    const icon = makeProductIcon(product, "large detail-icon");
    content.append(icon);
    content.append(createElement("h2", "detail-title", product.title));
    content.append(createElement("p", "detail-strapline", product.strapline));
    content.append(createElement("p", "detail-summary", product.summary));

    const readinessCard = createElement("div", "readiness-card");
    const readiness = createElement("span", "readiness", product.readiness);
    readiness.style.setProperty("--accent", product.accent);
    readinessCard.append(readiness);
    readinessCard.append(createElement("p", "", product.readiness_description));
    content.append(readinessCard);

    const capabilityList = createElement("ul", "capability-list");
    capabilityList.style.setProperty("--accent", product.accent);
    product.capabilities.forEach((capability) => {
        capabilityList.append(createElement("li", "", capability));
    });
    content.append(detailSection("CORE CAPABILITIES", capabilityList));
    content.append(detailSection("EXPECTED DATA", tagList(product.data_inputs, product.accent)));
    content.append(detailSection("TECHNOLOGY", tagList(product.stack, product.accent)));

    const sourceSection = createElement("section", "detail-section");
    sourceSection.append(createElement("span", "section-label", "SOURCE"));
    const sourceCard = createElement("div", "source-card");
    sourceCard.append(createElement("code", "", product.repo_url.replace("https://", "")));
    sourceCard.append(createElement("p", "", `Default branch: ${product.default_branch}`));
    sourceSection.append(sourceCard);
    content.append(sourceSection);

    const actions = createElement("div", "detail-actions");
    const getProduct = createElement("button", "primary-button", "Get product");
    getProduct.type = "button";
    getProduct.addEventListener("click", () => openCloneDialog(product));

    const openRepository = createElement("a", "secondary-button", "Open GitHub repository");
    openRepository.href = product.repo_url;
    openRepository.target = "_blank";
    openRepository.rel = "noreferrer";

    const copyRepository = createElement("button", "quiet-button", "Copy repository URL");
    copyRepository.type = "button";
    copyRepository.addEventListener("click", () => copyText(product.repo_url));
    actions.append(getProduct, openRepository, copyRepository);
    content.append(actions);

    elements.detailContent.replaceChildren(content);
}

function selectProduct(productId) {
    const product = productById(productId);
    if (!product) {
        return;
    }
    state.selectedId = productId;
    renderDetails(product);
    elements.shell.classList.add("details-open");
    elements.detailPanel.setAttribute("aria-hidden", "false");
    elements.closeDetail.focus({ preventScroll: true });
}

function closeDetails() {
    state.selectedId = null;
    elements.shell.classList.remove("details-open");
    elements.detailPanel.setAttribute("aria-hidden", "true");
}

function openCloneDialog(product) {
    state.cloneProductId = product.id;
    elements.cloneIcon.textContent = product.short_name;
    elements.cloneIcon.style.setProperty("--accent", product.accent);
    elements.cloneTitle.textContent = product.title;
    elements.cloneStrapline.textContent = product.strapline;
    elements.cloneTarget.textContent = joinWindowsPath(config.cloneRoot, product.id);
    elements.downloadZip.href = `${product.repo_url}/archive/refs/heads/${encodeURIComponent(product.default_branch)}.zip`;
    elements.cloneStatus.textContent = "";
    elements.cloneStatus.classList.remove("error");
    elements.confirmClone.disabled = false;
    elements.confirmClone.textContent = "Clone repository locally";
    elements.cloneDialog.showModal();
}

function joinWindowsPath(root, leaf) {
    const separator = root.includes("\\") ? "\\" : "/";
    return `${root.replace(/[\\/]$/, "")}${separator}${leaf}`;
}

async function cloneSelectedProduct() {
    const product = productById(state.cloneProductId);
    if (!product) {
        return;
    }

    elements.confirmClone.disabled = true;
    elements.confirmClone.textContent = "Cloning...";
    elements.cloneStatus.textContent = "Git is creating a shallow local copy.";
    elements.cloneStatus.classList.remove("error");

    try {
        const response = await fetch("/api/clone", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": config.csrfToken,
            },
            body: JSON.stringify({ product_id: product.id }),
        });
        const payload = await response.json();
        if (!response.ok) {
            throw new Error(payload.error || "The repository could not be cloned.");
        }

        elements.cloneStatus.textContent = `Created: ${payload.target}`;
        elements.confirmClone.textContent = "Clone complete";
        showToast(`${product.title} cloned to ${payload.target}`);
        window.setTimeout(() => elements.cloneDialog.close(), 1100);
    } catch (error) {
        elements.cloneStatus.textContent = error.message;
        elements.cloneStatus.classList.add("error");
        elements.confirmClone.disabled = false;
        elements.confirmClone.textContent = "Try clone again";
        showToast(error.message, true);
    }
}

async function copyText(value) {
    try {
        await navigator.clipboard.writeText(value);
        showToast("Repository URL copied");
    } catch {
        const helper = document.createElement("textarea");
        helper.value = value;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.append(helper);
        helper.select();
        document.execCommand("copy");
        helper.remove();
        showToast("Repository URL copied");
    }
}

function showToast(message, isError = false) {
    const toast = createElement("div", `toast${isError ? " error" : ""}`, message);
    elements.toastRegion.append(toast);
    window.setTimeout(() => toast.remove(), 5200);
}

function resetResults() {
    state.query = "";
    state.category = null;
    elements.search.value = "";
    renderProducts();
}

elements.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderProducts();
});

elements.search.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        state.query = "";
        elements.search.value = "";
        renderProducts();
        elements.search.blur();
    }
});

document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
    if (event.key === "/" && !isTyping && !elements.cloneDialog.open) {
        event.preventDefault();
        elements.search.focus();
    }
    if (event.key === "Escape" && state.selectedId && !elements.cloneDialog.open) {
        closeDetails();
    }
});

document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
        state.view = button.dataset.view;
        renderProducts();
    });
});

elements.clearFilter.addEventListener("click", () => {
    state.category = null;
    renderProducts();
});
elements.resetResults.addEventListener("click", resetResults);
elements.emptyReset.addEventListener("click", resetResults);
elements.closeDetail.addEventListener("click", closeDetails);
elements.confirmClone.addEventListener("click", cloneSelectedProduct);

async function initialiseCatalogue() {
    try {
        const response = await fetch("/api/catalogue", {
            headers: { Accept: "application/json" },
        });
        if (!response.ok) {
            throw new Error("The local catalogue data could not be loaded.");
        }
        const payload = await response.json();
        products = payload.products;
        config.categories = payload.categories;
        state.favourites = loadFavourites();
        renderCategoryFilters();
        renderProducts();
    } catch (error) {
        elements.resultCount.textContent = "CATALOGUE UNAVAILABLE";
        elements.productGrid.hidden = true;
        elements.emptyState.hidden = false;
        showToast(error.message, true);
    }
}

initialiseCatalogue();
