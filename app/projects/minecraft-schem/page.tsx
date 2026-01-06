"use client";

import { useState } from "react";
import { Code, Box, Download, Play, ExternalLink, ChevronDown } from "lucide-react";
import Link from "next/link";

const exampleCode = `from schematic_api import Schematic
from blocks import STONE, GLASS, OAK_PLANKS

# Create a 10x10x10 schematic
s = Schematic(10, 10, 10)

# Build a stone floor
s.fill(0, 0, 0, 9, 0, 9, STONE)

# Create a glass room
s.hollow_box(2, 1, 2, 7, 5, 7, GLASS)

# Add a wooden roof
s.fill(2, 6, 2, 7, 6, 7, OAK_PLANKS)`;

export default function MinecraftSchemDemo() {
  const [code, setCode] = useState(exampleCode);
  const [isRunning, setIsRunning] = useState(false);
  const [hasSchematic, setHasSchematic] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setHasSchematic(true);
      setIsRunning(false);
    }, 1500);
  };

  const handleExport = () => {
    alert("Exporting schematic to .schem format... (Mock)");
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
            Minecraft Schematic Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Code-driven tool for creating Minecraft schematics with real-time 3D preview
          </p>
          <a
            href="https://github.com/cj1101/minecraftSchemMaker"
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
            <strong>Minecraft Schematic Builder</strong> is a code-driven tool that allows users to programmatically create Minecraft structures using Python. At full capacity, it features a Python Flask backend that executes schematic generation code, a Three.js-powered 3D preview that renders blocks in real-time, and nbtlib integration to export .schem files that are compatible with WorldEdit and can be imported directly into Minecraft servers.
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
                    When running at full capacity, the Minecraft Schematic Builder provides a complete development environment:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Python Code Execution:</strong> The Flask backend receives user-written Python code via API, executes it in a sandboxed environment, and processes schematic generation commands. The API provides a comprehensive library of block types, shape generators (fill, hollow_box, sphere, cylinder), and coordinate manipulation functions.</li>
                    <li><strong>Real-Time 3D Preview:</strong> Uses Three.js WebGL renderer to create an interactive 3D visualization of the schematic. The preview accurately represents block types with correct textures and colors, supports camera rotation and zoom, and updates in real-time as code is executed. Users can inspect their structures from any angle before exporting.</li>
                    <li><strong>Schematic Export:</strong> Uses the nbtlib Python library to generate .schem files in the Sponge Schematic Format, which is compatible with WorldEdit, MCEdit, and most modern Minecraft server plugins. The export includes block data, entity positions, tile entity data, and metadata required for accurate reconstruction in-game.</li>
                    <li><strong>Block Library:</strong> Provides access to hundreds of Minecraft block types including all vanilla blocks, with support for block states, variants, and properties. Users can reference blocks by name (e.g., STONE, GLASS, OAK_PLANKS) or by Minecraft ID.</li>
                    <li><strong>Shape Generators:</strong> Includes built-in functions for common shapes (boxes, spheres, cylinders, pyramids) as well as advanced features like pattern filling, gradient generation, and procedural structure creation.</li>
                    <li><strong>Code Validation:</strong> Validates Python syntax before execution, provides error messages for invalid code, and includes safety limits to prevent resource exhaustion (max schematic size, execution timeouts).</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Demo Limitations
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    This demo shows the interface and workflow, but all backend processing is simulated:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Code Execution:</strong> The &quot;Run&quot; button doesn&apos;t actually execute Python code or communicate with a Flask backend. In production, clicking Run would send a POST request to the Flask API endpoint (e.g., /api/execute), which would run the code in a secure sandbox, process schematic generation commands, and return the resulting block data as JSON.</li>
                    <li><strong>3D Preview:</strong> The 3D viewer shows a static placeholder visualization. In production, the Flask backend would return block coordinate and type data, which Three.js would use to render an accurate 3D representation with proper block textures, lighting, and interactive camera controls.</li>
                    <li><strong>Schematic Export:</strong> The &quot;Export .schem&quot; button only shows an alert. In production, this would trigger the Flask backend to use nbtlib to create a binary .schem file from the generated block data, which would then be downloaded to the user&apos;s computer. The file would be immediately usable in WorldEdit or other Minecraft tools.</li>
                    <li><strong>Block Data:</strong> The available blocks list is static. In production, the system would maintain a comprehensive database of all Minecraft block types with their properties, IDs, and states, allowing users to use any block available in the game.</li>
                    <li><strong>Error Handling:</strong> The demo doesn&apos;t show syntax errors or execution errors. In production, invalid code would return detailed error messages, and the interface would highlight syntax issues before execution.</li>
                    <li><strong>File Management:</strong> The file selector dropdown is non-functional. In production, users could save and load schematic code files, share them with others, and maintain a library of reusable structure templates.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Code size={20} className="text-gray-600 dark:text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Code Editor
                </h2>
              </div>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
              >
                <Play size={18} />
                {isRunning ? "Running..." : "Run"}
              </button>
            </div>

            <div className="p-4">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                spellCheck={false}
              />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                  <option>simple_house.py</option>
                  <option>tower.py</option>
                  <option>sphere.py</option>
                </select>
                <button
                  onClick={handleExport}
                  disabled={!hasSchematic}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                >
                  <Download size={18} />
                  Export .schem
                </button>
              </div>
            </div>
          </div>

          {/* 3D Viewer */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Box size={20} className="text-gray-600 dark:text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  3D Preview
                </h2>
              </div>
            </div>

            <div className="p-4">
              {isRunning ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Generating schematic...
                    </p>
                  </div>
                </div>
              ) : hasSchematic ? (
                <div className="h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg relative overflow-hidden">
                  {/* Mock 3D visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="mb-4">
                        <div className="inline-block transform rotate-45">
                          <div className="w-32 h-32 bg-gray-700 border-2 border-gray-600 mb-2"></div>
                          <div className="w-32 h-32 bg-gray-600 border-2 border-gray-500 mx-auto"></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">
                        3D Schematic Preview
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Dimensions: 10x10x10 blocks
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-96 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <Box size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Run code to generate schematic preview</p>
                  </div>
                </div>
              )}
            </div>

            {hasSchematic && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Width</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      10 blocks
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Height</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      10 blocks
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Length</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      10 blocks
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Available Blocks
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>STONE, GLASS, OAK_PLANKS</div>
              <div>BRICKS, DIRT, GRASS</div>
              <div>WOOL, METAL BLOCKS</div>
              <div>+ 30 more block types</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Shape Generators
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>• fill() - Fill region</div>
              <div>• hollow_box() - Create walls</div>
              <div>• sphere() - Generate spheres</div>
              <div>• cylinder() - Create cylinders</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Export Format
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>• .schem format</div>
              <div>• WorldEdit compatible</div>
              <div>• Ready for Minecraft</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


