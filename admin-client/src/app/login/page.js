"use client";

const page = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#74C044]">
            Herald Sync{" "}
            <span className="font-light text-xl font-serif">Admin</span>
          </h1>
        </div>

        {/* Inputs */}
        <div className="flex flex-col space-y-6 mb-8">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#74C044]"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#74C044]"
          />
        </div>

        {/* Button */}
        <div>
          <button
            className="w-full bg-[#74C044] text-white py-2 rounded-md text-lg font-semibold hover:bg-[#5e9c35] transition-colors"
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
