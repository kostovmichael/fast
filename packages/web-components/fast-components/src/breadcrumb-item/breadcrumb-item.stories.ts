import { FASTDesignSystemProvider } from "../design-system-provider";
import BreadcrumbItemTemplate from "./fixtures/base.html";
import { FASTBreadcrumbItem } from ".";

// Prevent tree-shaking
FASTBreadcrumbItem;
FASTDesignSystemProvider;

export default {
    title: "Breadcrumb Item",
};

export const BreadcrumbItem = () => BreadcrumbItemTemplate;
