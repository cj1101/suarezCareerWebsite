"use client";

import { useState } from "react";
import { Palette, Upload, Download, Image as ImageIcon, ExternalLink, ChevronDown } from "lucide-react";
import Link from "next/link";

const mockProducts = [
  { id: 1, name: "T-Shirt", image: "/api/placeholder/300/400" },
  { id: 2, name: "Hoodie", image: "/api/placeholder/300/400" },
  { id: 3, name: "Mug", image: "/api/placeholder/300/400" },
  { id: 4, name: "Poster", image: "/api/placeholder/300/400" },
];

export default function MoodyNickDemo() {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);
  const [designArea, setDesignArea] = useState<any>(null);
  const [mockupPreview, setMockupPreview] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleGenerateMockup = () => {
    setMockupPreview(true);
    setTimeout(() => {
      // Mockup generated
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/projects"
            className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
          >
            ← Back to Projects
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            moodyNick Design Studio
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Custom design interface with product mockup functionality
          </p>
          <a
            href="https://github.com/cj1101/moodyNick"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink size={16} />
            View on GitHub
          </a>
        </div>

        {/* Summary Section */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>moodyNick Design Studio</strong> is a comprehensive design platform for creating custom branded merchandise. At full capacity, it provides a full-featured design canvas with drawing tools, text editing, and image manipulation, generates realistic product mockups by compositing designs onto product templates, stores all designs and user data in MongoDB, and supports user accounts with saved design libraries and collaboration features.
          </p>
        </div>

        {/* Expandable Detailed Section */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Full Functionality & Demo Limitations
            </h2>
            <ChevronDown
              size={24}
              className={`text-gray-600 dark:text-gray-400 transition-transform ${
                isExpanded ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {isExpanded && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Full Functionality
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    When running at full capacity, moodyNick Design Studio provides a complete design and mockup solution:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Interactive Design Canvas:</strong> Features a full-featured drawing interface with tools for shapes, text, images, layers, and effects. Users can draw freehand, add text with custom fonts and colors, import images, apply filters and effects, and work with multiple layers for complex designs. The canvas supports zoom, pan, and precise positioning.</li>
                    <li><strong>Product Mockup Generation:</strong> Uses server-side image processing (Node.js with image manipulation libraries like Sharp or Canvas) to composite user designs onto high-quality product templates. The system applies proper perspective, lighting, shadows, and fabric textures to create photorealistic mockups of T-shirts, hoodies, mugs, posters, and other products.</li>
                    <li><strong>MongoDB Data Storage:</strong> Stores all user accounts, saved designs, design history, product preferences, and user settings in MongoDB. Designs are stored as JSON objects containing layer data, which can be re-opened and edited later. Supports versioning and design templates.</li>
                    <li><strong>User Authentication & Accounts:</strong> Implements secure user registration and login using authentication libraries (e.g., Passport.js, NextAuth). Users can create accounts, save designs to their personal library, share designs with others, and collaborate on projects.</li>
                    <li><strong>Media Management:</strong> Handles image uploads, stores them in cloud storage (e.g., AWS S3 or Cloudinary), and provides a media library where users can access previously uploaded images, logos, and design assets.</li>
                    <li><strong>Export & Download:</strong> Allows users to export designs in various formats (PNG, SVG, PDF) at different resolutions, download mockup images, and prepare designs for print or digital use.</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Demo Limitations
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    This demo shows the interface and workflow, but all backend functionality is simulated:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Design Canvas:</strong> The canvas area is a static placeholder with no actual drawing functionality. In production, this would be an interactive HTML5 Canvas or SVG-based drawing interface with tools for creating shapes, adding text, importing images, and manipulating layers. User interactions would be captured and stored as design data.</li>
                    <li><strong>Mockup Generation:</strong> The &quot;Generate Mockup&quot; button only shows a placeholder preview. In production, clicking this would send the design data to a Node.js backend API endpoint, which would use image processing libraries to composite the design onto product template images, apply realistic lighting and shadows, and return high-resolution mockup images.</li>
                    <li><strong>Media Upload:</strong> The upload button doesn&apos;t actually process or save files. In production, file uploads would be sent to the backend, validated, processed (resized, optimized), stored in cloud storage, and the URLs would be saved to MongoDB and returned to the frontend for use in designs.</li>
                    <li><strong>Design Persistence:</strong> No designs are saved between sessions. In production, when users create or modify designs, the design data (layers, colors, positions, etc.) would be saved to MongoDB as JSON documents, allowing users to return later and continue working on their designs.</li>
                    <li><strong>User Accounts:</strong> There is no authentication system in the demo. In production, users would need to register and log in, and all designs would be associated with user accounts, enabling personal design libraries and collaboration features.</li>
                    <li><strong>Product Selection:</strong> Product selection updates the UI but doesn&apos;t affect mockup generation. In production, selecting different products would load appropriate template images and adjust the design area dimensions to match the product&apos;s printable area.</li>
                    <li><strong>Download & Share:</strong> The download and share buttons are non-functional. In production, these would generate and serve downloadable image files, or create shareable links that allow others to view the mockups.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Select Product
            </h2>
            <div className="space-y-3">
              {mockProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    selectedProduct.id === product.id
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded"></div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Design Area */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Palette size={20} className="text-gray-600 dark:text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Design Canvas
                </h2>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                  <Upload size={18} />
                  Upload
                </button>
                <button
                  onClick={handleGenerateMockup}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 flex items-center gap-2"
                >
                  <ImageIcon size={18} />
                  Generate Mockup
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                {designArea ? (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Design Preview
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <Palette size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Design area for {selectedProduct.name}</p>
                    <p className="text-sm mt-2">
                      Upload artwork or create design here
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {["Red", "Blue", "Green", "Purple"].map((color) => (
                  <button
                    key={color}
                    className="h-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                    style={{
                      backgroundColor:
                        color === "Red"
                          ? "#ef4444"
                          : color === "Blue"
                          ? "#3b82f6"
                          : color === "Green"
                          ? "#10b981"
                          : "#a855f7",
                    }}
                    title={color}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mockup Preview */}
        {mockupPreview && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Product Mockup Preview
              </h2>
              <button
                onClick={() => setMockupPreview(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center"
                >
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Mockup {i}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-90 flex items-center gap-2">
                <Download size={18} />
                Download All
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                Share
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Features
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Custom design interface with canvas area</li>
            <li>Multiple product types (T-shirts, hoodies, mugs, posters)</li>
            <li>Real-time product mockup generation</li>
            <li>Artwork upload and management</li>
            <li>Design area dimension controls</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


