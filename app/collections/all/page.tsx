import CategoryPage from "../[slug]/page";

export default function AllProductsPage() {
  return <CategoryPage params={Promise.resolve({ slug: "all" })} />;
}
