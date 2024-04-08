import HomepageLayout from "../components/Layout/HomepageLayout";

export default function About() {
  return (
    <HomepageLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mt-24">About Us</h1>
        <div className="bg-white shadow-lg rounded-lg p-24">
          <p className="text-lg text-gray-700 mb-4">
            Our administration system is designed to streamline the process of
            managing territories, making it easier and more efficient for users.
            With capabilities to edit territories and share them with others, we
            focus on enhancing collaboration and accessibility.
          </p>
          <p className="text-lg text-gray-700">
            Our mission is to make territorial management more accessible and
            user-friendly than ever before. We strive to provide an intuitive
            platform that meets the needs of our users, enabling them to manage
            territories effectively and share their work seamlessly with
            colleagues and stakeholders.
          </p>
        </div>
      </div>
    </HomepageLayout>
  );
}
