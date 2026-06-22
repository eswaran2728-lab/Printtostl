"""
PhotoToSTL Pro - Blender Python Backend API
Handles mesh repair, optimization, and export operations.

TODO: Connect to Meshy API, Tripo API, Hunyuan3D, or TripoSR for generation.
"""
from flask import Flask, request, jsonify
import blender_repair
import mesh_checks

app = Flask(__name__)

@app.route('/repair', methods=['POST'])
def repair_mesh():
    """Receive OBJ/GLB/STL, run repair pipeline, return STL."""
    data = request.json
    model_path = data.get('model_path')
    settings = data.get('settings', {})
    result = blender_repair.run_repair_pipeline(model_path, settings)
    return jsonify(result)

@app.route('/check', methods=['POST'])
def check_printability():
    """Run printability checks on a mesh and return report."""
    data = request.json
    model_path = data.get('model_path')
    report = mesh_checks.generate_report(model_path)
    return jsonify(report)

@app.route('/export', methods=['POST'])
def export_model():
    """Export repaired model to STL/OBJ/GLB."""
    data = request.json
    model_path = data.get('model_path')
    output_format = data.get('format', 'stl')
    result = blender_repair.export_model(model_path, output_format)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
