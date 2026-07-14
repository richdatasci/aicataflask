"use strict";

let products = [];
let modelCards = [];

const config = {
    productCategories: [],
    modelCategories: [],
    cloneRoot: document.querySelector('meta[name="clone-root"]').content,
    csrfToken: document.querySelector('meta[name="csrf-token"]').content,
};

const elements = {
    shell: document.getElementById("app-shell"),
    productGrid: document.getElementById("product-grid"),
    emptyState: document.getElementById("empty-state"),
    emptyTitle: document.getElementById("empty-title"),
    emptyCopy: document.getElementById("empty-copy"),
    search: document.getElementById("catalogue-search"),
    resultCount: document.getElementById("result-count"),
    activeFilterChip: document.getElementById("active-filter-chip"),
    clearFilter: document.getElementById("clear-filter"),
    resetResults: document.getElementById("reset-results"),
    emptyReset: document.getElementById("empty-reset"),
    categoryFilters: document.getElementById("category-filters"),
    filterSectionLabel: document.getElementById("filter-section-label"),
    favouriteCount: document.getElementById("favourite-count"),
    catalogueEyebrow: document.getElementById("catalogue-eyebrow"),
    catalogueTitle: document.getElementById("catalogue-title"),
    catalogueSubtitle: document.getElementById("catalogue-subtitle"),
    featureTitle: document.getElementById("feature-title"),
    featureCopy: document.getElementById("feature-copy"),
    sidebarNoteTitle: document.getElementById("sidebar-note-title"),
    sidebarNoteCopy: document.getElementById("sidebar-note-copy"),
    detailPanel: document.getElementById("detail-panel"),
    detailContent: document.getElementById("detail-content"),
    detailSectionLabel: document.getElementById("detail-section-label"),
    closeDetail: document.getElementById("close-detail"),
    cloneDialog: document.getElementById("clone-dialog"),
    cloneIcon: document.getElementById("clone-icon"),
    cloneTitle: document.getElementById("clone-title"),
    cloneStrapline: document.getElementById("clone-strapline"),
    cloneTarget: document.getElementById("clone-target"),
    downloadZip: document.getElementById("download-zip"),
    confirmClone: document.getElementById("confirm-clone"),
    cloneStatus: document.getElementById("clone-status"),
    weightsDialog: document.getElementById("weights-dialog"),
    weightsIcon: document.getElementById("weights-icon"),
    weightsTitle: document.getElementById("weights-title"),
    weightsStrapline: document.getElementById("weights-strapline"),
    weightsFilename: document.getElementById("weights-filename"),
    toastRegion: document.getElementById("toast-region"),
};

const state = {
    section: "products",
    view: "all",
    query: "",
    category: null,
    selectedId: null,
    selectedKind: null,
    cloneProductId: null,
    favourites: new Set(),
};

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

function normalise(value) {
    return String(value).toLocaleLowerCase().trim();
}

function productById(productId) {
    return products.find((product) => product.id === productId);
}

function modelById(modelId) {
    return modelCards.find((model) => model.id === modelId);
}

function activeCollection() {
    return state.section === "models" ? modelCards : products;
}

function activeCategories() {
    return state.section === "models"
        ? config.modelCategories
        : config.productCategories;
}

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
    try {
        localStorage.setItem(
            "ai-catalogue-favourites",
            JSON.stringify(Array.from(state.favourites)),
        );
    } catch {
        showToast("Browser favourites could not be saved.", true);
    }
}

function searchableText(item) {
    return normalise([
        item.title,
        item.strapline,
        item.summary,
        item.parameter_count || "",
        item.input_profile || "",
        item.output_profile || "",
        ...(item.categories || []),
        ...(item.capabilities || []),
        ...(item.stack || []),
        ...(item.data_inputs || []),
        ...(item.tasks || []),
        ...(item.fine_tuning || []),
        ...(item.intended_uses || []),
        ...(item.weight_formats || []),
    ].join(" "));
}

function filteredItems() {
    const query = normalise(state.query);
    return activeCollection().filter((item) => {
        const matchesQuery = !query || searchableText(item).includes(query);
        const matchesCategory = !state.category || item.categories.includes(state.category);
        const matchesView = state.section === "models"
            || state.view === "all"
            || state.favourites.has(item.id);
        return matchesQuery && matchesCategory && matchesView;
    });
}

function makeTag(label, accent) {
    const tag = createElement("span", "tag", label);
    tag.style.setProperty("--tag-color", accent);
    return tag;
}

function makeItemIcon(item, extraClass = "") {
    const icon = createElement(
        "div",
        `product-icon ${extraClass}`.trim(),
        item.short_name,
    );
    icon.style.setProperty("--accent", item.accent);
    return icon;
}

function addKeyboardOpen(card, open) {
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            open();
        }
    });
}

function makeProductCard(product) {
    const card = createElement("article", "product-card");
    card.style.setProperty("--accent", product.accent);
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${product.title}`);

    const topLine = createElement("div", "card-topline");
    topLine.append(makeItemIcon(product));

    const isFavourite = state.favourites.has(product.id);
    const favourite = createElement(
        "button",
        `favourite-button${isFavourite ? " active" : ""}`,
        isFavourite ? "★" : "☆",
    );
    favourite.type = "button";
    favourite.setAttribute(
        "aria-label",
        isFavourite
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
    meta.append(readiness, createElement("span", "view-link", "VIEW PRODUCT  →"));
    footer.append(meta);
    card.append(footer);

    addKeyboardOpen(card, () => selectItem(product.id, "product"));
    return card;
}

function makeModelCard(model) {
    const card = createElement("article", "product-card model-card");
    card.style.setProperty("--accent", model.accent);
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View illustrative model card for ${model.title}`);

    const topLine = createElement("div", "card-topline");
    topLine.append(makeItemIcon(model));
    topLine.append(createElement("span", "placeholder-label", "DEMO MODEL"));
    card.append(topLine);

    card.append(createElement("h2", "card-title", model.title));
    card.append(createElement("p", "card-strapline", model.strapline));
    card.append(createElement("p", "card-summary", model.summary));

    const specs = createElement("div", "model-specs");
    const parameters = createElement("div", "model-spec");
    parameters.append(
        createElement("span", "model-spec-value", model.parameter_count),
        createElement("span", "model-spec-label", "PARAMETERS"),
    );
    const formats = createElement("div", "model-spec");
    formats.append(
        createElement("span", "model-spec-value", model.weight_formats.join(" / ")),
        createElement("span", "model-spec-label", "PLANNED FORMAT"),
    );
    specs.append(parameters, formats);
    card.append(specs);

    const footer = createElement("div", "card-footer");
    footer.append(tagList(model.categories, model.accent));
    const meta = createElement("div", "card-meta");
    const readiness = createElement("span", "readiness", "Illustrative model card");
    readiness.style.setProperty("--accent", model.accent);
    meta.append(readiness, createElement("span", "view-link", "VIEW MODEL  →"));
    footer.append(meta);
    card.append(footer);

    addKeyboardOpen(card, () => selectItem(model.id, "model"));
    return card;
}

function renderCatalogue() {
    const matches = filteredItems();
    const cards = state.section === "models"
        ? matches.map(makeModelCard)
        : matches.map(makeProductCard);

    elements.productGrid.replaceChildren(...cards);
    elements.productGrid.hidden = matches.length === 0;
    elements.emptyState.hidden = matches.length !== 0;
    elements.resultCount.textContent = `${matches.length} ${matches.length === 1 ? "RESULT" : "RESULTS"}`;
    elements.favouriteCount.textContent = String(state.favourites.size);

    elements.activeFilterChip.hidden = !state.category;
    elements.activeFilterChip.textContent = state.category || "";
    elements.clearFilter.hidden = !state.category;
    elements.resetResults.hidden = !state.category && !state.query;

    document.querySelectorAll("[data-section]").forEach((button) => {
        const active = button.dataset.section === state.section && state.view === "all";
        button.classList.toggle("active", active);
    });
    document.querySelectorAll("[data-view]").forEach((button) => {
        const active = state.section === "products" && button.dataset.view === state.view;
        button.classList.toggle("active", active);
    });
    document.querySelectorAll("[data-category]").forEach((button) => {
        const value = button.dataset.category || null;
        button.classList.toggle("active", value === state.category);
    });
}

function renderCategoryFilters() {
    const fragment = document.createDocumentFragment();
    const collection = activeCollection();
    const categories = [null, ...activeCategories()];

    categories.forEach((category) => {
        const button = createElement("button", "filter-button");
        button.type = "button";
        button.dataset.category = category || "";

        const label = createElement("span", "", category || "All types");
        const count = category
            ? collection.filter((item) => item.categories.includes(category)).length
            : collection.length;
        button.append(label, createElement("span", "filter-count", String(count)));
        button.addEventListener("click", () => {
            state.category = category;
            renderCatalogue();
        });
        fragment.append(button);
    });

    elements.categoryFilters.replaceChildren(fragment);
}

function configureSection() {
    const isModels = state.section === "models";
    elements.productGrid.setAttribute(
        "aria-label",
        isModels ? "Illustrative AI model cards" : "Ready-to-use AI products",
    );
    elements.filterSectionLabel.textContent = isModels ? "MODEL TYPE" : "AI / ML TYPE";
    elements.catalogueEyebrow.textContent = isModels ? "MODEL COMPONENT LIBRARY" : "ACCELERATOR LIBRARY";
    elements.catalogueTitle.textContent = isModels
        ? "Explore adaptable AI model components"
        : "Explore reusable AI products";
    elements.catalogueSubtitle.textContent = isModels
        ? "Compare illustrative model cards, fine-tuning routes and the governed information needed before weights are made available."
        : "Choose a proven starting point, then adapt it around your data and delivery constraints.";
    elements.featureTitle.textContent = isModels
        ? "Start with a governed model card"
        : "Accelerate the first 60%";
    elements.featureCopy.textContent = isModels
        ? "Every model shown here is an explicit demo placeholder. No model binary, benchmark or external download is being represented as real."
        : "These are adaptable foundations, not finished products. Review security, data and deployment requirements before production use.";
    elements.sidebarNoteTitle.textContent = isModels ? "Components for fine-tuning" : "Built for adaptation";
    elements.sidebarNoteCopy.textContent = isModels
        ? "Assess task fit, model governance and fine-tuning options before obtaining approved weights."
        : "Clone a starter, connect your data and focus on the use case.";
    elements.search.placeholder = isModels
        ? "Search model cards, tasks or fine-tuning methods..."
        : "Search products, capabilities or stack...";
    elements.emptyTitle.textContent = isModels ? "No matching model cards" : "No matching products";
    elements.emptyCopy.textContent = isModels
        ? "Try a different model task or clear the model-type filter."
        : "Try a different search term or clear the AI / ML filter.";
}

function switchSection(section, view = "all") {
    state.section = section;
    state.view = view;
    state.query = "";
    state.category = null;
    elements.search.value = "";
    closeDetails();
    configureSection();
    renderCategoryFilters();
    renderCatalogue();
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
    renderCatalogue();
    if (state.selectedId === productId && state.selectedKind === "product") {
        renderProductDetails(productById(productId));
    }
}

function detailSection(title, content) {
    const section = createElement("section", "detail-section");
    section.append(createElement("span", "section-label", title), content);
    return section;
}

function tagList(values, accent) {
    const list = createElement("div", "tag-list");
    values.forEach((value) => list.append(makeTag(value, accent)));
    return list;
}

function bulletList(values, accent) {
    const list = createElement("ul", "capability-list");
    list.style.setProperty("--accent", accent);
    values.forEach((value) => list.append(createElement("li", "", value)));
    return list;
}

function renderProductDetails(product) {
    if (!product) {
        return;
    }

    const content = document.createDocumentFragment();
    content.append(makeItemIcon(product, "large detail-icon"));
    content.append(createElement("h2", "detail-title", product.title));
    content.append(createElement("p", "detail-strapline", product.strapline));
    content.append(createElement("p", "detail-summary", product.summary));

    const readinessCard = createElement("div", "readiness-card");
    const readiness = createElement("span", "readiness", product.readiness);
    readiness.style.setProperty("--accent", product.accent);
    readinessCard.append(readiness, createElement("p", "", product.readiness_description));
    content.append(readinessCard);

    content.append(detailSection("CORE CAPABILITIES", bulletList(product.capabilities, product.accent)));
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
    copyRepository.addEventListener("click", () => copyText(product.repo_url, "Repository URL copied"));
    actions.append(getProduct, openRepository, copyRepository);
    content.append(actions);

    elements.detailContent.replaceChildren(content);
}

function renderModelDetails(model) {
    if (!model) {
        return;
    }

    const content = document.createDocumentFragment();
    content.append(makeItemIcon(model, "large detail-icon"));
    content.append(createElement("span", "detail-placeholder-label", "ILLUSTRATIVE MODEL CARD"));
    content.append(createElement("h2", "detail-title", model.title));
    content.append(createElement("p", "detail-strapline", model.strapline));
    content.append(createElement("p", "detail-summary", model.summary));

    const overview = createElement("div", "model-overview-grid");
    overview.append(
        modelOverviewItem("PARAMETERS", model.parameter_count),
        modelOverviewItem("VERSION", model.version),
        modelOverviewItem("INPUT", model.input_profile),
        modelOverviewItem("OUTPUT", model.output_profile),
    );
    content.append(overview);

    content.append(detailSection("SUPPORTED TASKS", tagList(model.tasks, model.accent)));
    content.append(detailSection("INTENDED USE", bulletList(model.intended_uses, model.accent)));
    content.append(detailSection("FINE-TUNING OPTIONS", tagList(model.fine_tuning, model.accent)));
    content.append(detailSection("PLANNED WEIGHT FORMATS", tagList(model.weight_formats, model.accent)));
    content.append(detailSection("LIMITATIONS", bulletList(model.limitations, model.accent)));

    const governance = createElement("div", "source-card model-governance-card");
    governance.append(createElement("span", "section-label", "GOVERNANCE PLACEHOLDER"));
    governance.append(createElement("p", "", `Licence: ${model.licence}`));
    governance.append(createElement("p", "", "Weights: not attached to this demonstration"));
    content.append(governance);

    const actions = createElement("div", "detail-actions");
    const weightsButton = createElement("button", "primary-button", "Download model weights");
    weightsButton.type = "button";
    weightsButton.addEventListener("click", () => openWeightsDialog(model));
    const copyId = createElement("button", "quiet-button", "Copy model card ID");
    copyId.type = "button";
    copyId.addEventListener("click", () => copyText(model.id, "Model card ID copied"));
    actions.append(weightsButton, copyId);
    content.append(actions);

    elements.detailContent.replaceChildren(content);
}

function modelOverviewItem(label, value) {
    const item = createElement("div", "model-overview-item");
    item.append(createElement("span", "model-overview-label", label));
    item.append(createElement("strong", "", value));
    return item;
}

function selectItem(itemId, kind) {
    const item = kind === "model" ? modelById(itemId) : productById(itemId);
    if (!item) {
        return;
    }
    state.selectedId = itemId;
    state.selectedKind = kind;
    if (kind === "model") {
        renderModelDetails(item);
        elements.detailSectionLabel.textContent = "MODEL CARD DETAILS";
        elements.detailPanel.setAttribute("aria-label", "AI model card details");
    } else {
        renderProductDetails(item);
        elements.detailSectionLabel.textContent = "PRODUCT DETAILS";
        elements.detailPanel.setAttribute("aria-label", "Product details");
    }
    elements.shell.classList.add("details-open");
    elements.detailPanel.setAttribute("aria-hidden", "false");
    elements.closeDetail.focus({ preventScroll: true });
}

function closeDetails() {
    state.selectedId = null;
    state.selectedKind = null;
    elements.shell.classList.remove("details-open");
    elements.detailPanel.setAttribute("aria-hidden", "true");
}

function openCloneDialog(product) {
    state.cloneProductId = product.id;
    elements.cloneIcon.textContent = product.short_name;
    elements.cloneIcon.style.setProperty("--accent", product.accent);
    elements.cloneTitle.textContent = product.title;
    elements.cloneStrapline.textContent = product.strapline;
    elements.cloneTarget.textContent = joinPath(config.cloneRoot, product.id);
    elements.downloadZip.href = `${product.repo_url}/archive/refs/heads/${encodeURIComponent(product.default_branch)}.zip`;
    elements.cloneStatus.textContent = "";
    elements.cloneStatus.classList.remove("error");
    elements.confirmClone.disabled = false;
    elements.confirmClone.textContent = "Clone repository locally";
    elements.cloneDialog.showModal();
}

function openWeightsDialog(model) {
    elements.weightsIcon.textContent = model.short_name;
    elements.weightsIcon.style.setProperty("--accent", model.accent);
    elements.weightsTitle.textContent = model.title;
    elements.weightsStrapline.textContent = model.strapline;
    elements.weightsFilename.textContent = `${model.id}.safetensors`;
    elements.weightsDialog.showModal();
}

function joinPath(root, leaf) {
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

async function copyText(value, confirmation) {
    try {
        await navigator.clipboard.writeText(value);
        showToast(confirmation);
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
        showToast(confirmation);
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
    renderCatalogue();
}

elements.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderCatalogue();
});

elements.search.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        state.query = "";
        elements.search.value = "";
        renderCatalogue();
        elements.search.blur();
    }
});

document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
    const dialogOpen = elements.cloneDialog.open || elements.weightsDialog.open;
    if (event.key === "/" && !isTyping && !dialogOpen) {
        event.preventDefault();
        elements.search.focus();
    }
    if (event.key === "Escape" && state.selectedId && !dialogOpen) {
        closeDetails();
    }
});

document.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => switchSection(button.dataset.section));
});

document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => switchSection("products", button.dataset.view));
});

elements.clearFilter.addEventListener("click", () => {
    state.category = null;
    renderCatalogue();
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
        modelCards = payload.model_cards;
        config.productCategories = payload.product_categories;
        config.modelCategories = payload.model_categories;
        state.favourites = loadFavourites();
        configureSection();
        renderCategoryFilters();
        renderCatalogue();
    } catch (error) {
        elements.resultCount.textContent = "CATALOGUE UNAVAILABLE";
        elements.productGrid.hidden = true;
        elements.emptyState.hidden = false;
        showToast(error.message, true);
    }
}

initialiseCatalogue();
