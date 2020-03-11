var compound_transform;

// automatically called whenever any transform changes
function CalculateCompoundTransform(transforms) {
    // matrices in `transforms[i].mat4x4`
    // note `transform[0]` is first tranform to apply to vertex
    var transform_matrices = [];
    // if only one transform, set compound transform eequal to it
    if (transforms.length === 1) {
        compound_transform = transforms[0].mat4x4;
    }
    // otherwise multiply all matrices together (in proper order)
    else {
        
        transforms.map((transform) => {
            transform_matrices.push(transform.mat4x4);
        })
        compound_transform = Matrix.multiply(transform_matrices.reverse());
    }

    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {
    // multiple vertex by compound_transform
    var final_vertex = Matrix.multiply([compound_transform, vertex]);
    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    app.transforms[index].type = type;
    if (type === "translate") {
        Mat4x4Translate(app.transforms[index].mat4x4, values[0], values[1], values[2]);
    } else if (type === "scale") {
        Mat4x4Scale(app.transforms[index].mat4x4, values[0], values[1], values[2]);
    } else if (type === "rotate_x") {
        Mat4x4RotateX(app.transforms[index].mat4x4, values[0] * Math.PI / 180);
    } else if (type === "rotate_y") {
        Mat4x4RotateY(app.transforms[index].mat4x4, values[0] * Math.PI / 180);
    } else if (type === "rotate_z") {
        Mat4x4RotateZ(app.transforms[index].mat4x4, values[0] * Math.PI / 180);
    }

    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}