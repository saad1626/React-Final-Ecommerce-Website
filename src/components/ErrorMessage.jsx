export default function ErrorMessage({ message = "Something went wrong. Please try again." }) {
  return <p className="text-center p-6 text-red-600">{message}</p>;
}