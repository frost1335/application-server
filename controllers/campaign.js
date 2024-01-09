const asyncHandler = require("../middlewares/asyncHandler");
const { registerFont, createCanvas } = require("canvas");
const saveCampaign = require("../campaign/saveCampaign");
const ErrorResponse = require("../utils/errorResponse");
const Campaign = require("../schemas/Campaign");
const { isDeepStrictEqual } = require("util");
const { isValidObjectId } = require("mongoose");

registerFont("./public/RobotoMono-VariableFont_wght.ttf", {
  family: "RobotoMono",
});

exports.getAll = asyncHandler(async (req, res, next) => {
  const campaigns = await Campaign.find();

  console.log(campaigns);

  return res.status(200).json({ success: true, data: campaigns });
});

exports.create = asyncHandler(async (req, res, next) => {
  const campaignData = req.body;

  // throw error if there is no design object in campaign
  if (
    !campaignData?.design?.front?.length &&
    !campaignData?.design?.back?.length
  ) {
    return next(
      new ErrorResponse(`Dizayda kamida 1 dona element bolishi kerak!`, 400)
    );
  }

  // creating mongodb instance of campaign
  const campaign = new Campaign({
    title: "Draft campaign",
    design: campaignData.design,
    products: campaignData.products,
    images: [],
    status: "Draft",
  });

  // sending campaign data and campaign id in order save images in proper file
  const campaignImages = await saveCampaign.onSave(campaignData, campaign._id);

  // inserting saved images to campaign data
  campaign.images = [...campaignImages];

  // saving campaign in mongoDB
  await campaign.save();

  console.log("Campaign saved!");

  res.status(201).json({
    success: true,
    data: campaign,
  });
});
exports.getOne = asyncHandler(async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.campaignId);

  res.status(200).json({
    success: true,
    data: campaign,
  });
});

exports.editAndSave = asyncHandler(async (req, res, next) => {
  const { campaignId } = req.params;

  if (!isValidObjectId(campaignId)) {
    return next(new ErrorResponse(`Campaign ID-${campaignId} toplimadi`, 404));
  }

  const campaign = await Campaign.findById(campaignId);

  const campaignSelect = {
    design: { ...JSON.parse(JSON.stringify(campaign.design)) },
    products: { ...JSON.parse(JSON.stringify(campaign.products)) },
  };

  const requestSelect = {
    design: { ...JSON.parse(JSON.stringify(req.body.design)) },
    products: { ...JSON.parse(JSON.stringify(req.body.products)) },
  };

  if (isDeepStrictEqual(campaignSelect, requestSelect)) {
    res.status(200).json({
      success: true,
      data: {
        updated: false,
        message: "Nothing to change",
      },
    });
  } else {
    // edit the campaign
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      {
        _id: campaignId,
      },
      {
        design: {
          ...req.body.design,
        },
        products: [...req.body.products],
        _id: campaignId,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        updated: true,
        message: "Campaign saved",
        campaign: updatedCampaign,
      },
    });
  }
});

exports.modifyOne = asyncHandler(async (req, res, next) => {
  return "modifyOne";
});

exports.deleteOne = asyncHandler(async (req, res, next) => {
  return "deleteOne";
});
