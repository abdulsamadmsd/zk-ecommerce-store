import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import ProductDetails from "./_components/ProductDetails";

export async function generateMetadata(
  props: PageProps<"/product/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const product = await getProductById(id);

  return {
    title: product
      ? `${product.title} | ZK STORE`
      : "Product Not Found | ZK STORE",
    description:
      product?.description || "View the full details for this product.",
  };
}

export default async function ProductPage(props: PageProps<"/product/[id]">) {
  const { id } = await props.params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4  py-3 sm:px-4 lg:px-8">
      <ProductDetails product={product} />
    </div>
  );
}
