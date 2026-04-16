import OrderTrackingPage from "./_components/OrderTrackingPage";

export default async function Page(props: PageProps<"/order/[orderId]">) {
  const { orderId } = await props.params;

  return <OrderTrackingPage orderId={orderId} />;
}
