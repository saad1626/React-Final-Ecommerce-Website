import Card from "../components/Card";

export default function About() {
  return (
    <Card>
      <h1 className="text-2xl font-bold mb-2">About Us</h1>
      <p>
        MyShop is a demo e-commerce application built as a React final project. It shows routing,
        authentication, hooks, context, reducers and API fetching in one app.
      </p>
    </Card>
  );
}