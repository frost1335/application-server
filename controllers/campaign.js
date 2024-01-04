const fs = require("fs");
const asyncHandler = require("../middlewares/asyncHandler");

exports.getAll = asyncHandler(async (req, res, next) => {
  return res.json({ user: req.user });
});

exports.create = asyncHandler(async (req, res, next) => {
  const campaign = req.body;

  // campaign.products.map((elem, index) => {
  //   console.log(elem);

  //   elem.types.map((type, idx) => {
  //     console.log(type);
  //   });
  // });

  // const canvas = new fabric.Canvas(null, { width: 700, height: 700 });

  // campaign.design.front.map((elem, idx) => {
  //   if (elem.type === "text") {
  //     console.log(elem);
  //     const canvasText = new fabric.Text(elem.text, {
  //       ...elem,
  //     });

  //     canvas.add(canvasText);
  //     canvas.renderAll();
  //   }
  //   if (elem.type === "icon") {
  //     fabric.loadSVGFromURL(elem.url, (objects, options) => {
  //       const svgObject = fabric.util.groupSVGElements(objects, options);

  //       svgObject.set({ ...elem });

  //       svgObject._objects.map((elem) =>
  //         elem.fill ? elem.set({ fill: elem.fill }) : elem
  //       );

  //       canvas.add(svgObject);
  //       canvas.renderAll();
  //     });
  //   }
  // });

  // const out = fs.createWriteStream(__dirname + "/output.png");
  // const stream = canvas.createPNGStream();
  // stream.pipe(out);
  // out.on("finish", () => console.log("Image saved."));

  // return {
  //   success: true,
  //   data: "Campaign is saved",
  // };
});
exports.getOne = asyncHandler(async (req, res, next) => {
  return "getOne";
});
exports.editOne = asyncHandler(async (req, res, next) => {
  return "editOne";
});
exports.deleteOne = asyncHandler(async (req, res, next) => {
  return "deleteOne";
});
