"use strict";

const CloudProperty = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10
};

const BarSize = {
  MAX_HEIGHT: 150,
  WIDTH: 40
};

const Congratulation = {
  FIRST_STRING: `Ура вы победили!`,
  SECOND_STRING: `Список результатов:`
};

const Font = {
  SIZE: `16px`,
  FAMILY: `PT Mono`
};

const Color = {
  CLOUD: `rgba(255, 255, 255, 1)`,
  SHADOW: `rgba(0, 0, 0, 0.7)`,
  TEXT: `rgba(0, 0, 0, 1)`,
  SATURATION_MIN: 0,
  SATURATION_MAX: 100,
  YOU_BAR: `rgba(255, 0, 0, 1)`
};

const BAR_GAP = 50;
const TEXT_GAP = 16;

const getSaturation = function (min, max) {
  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

const getMaxElement = function (array) {
  let maxElement = array[0];

  for (let i = 1; i < array.length; i++) {
    let currentElement = array[i];

    if (currentElement > maxElement) {
      maxElement = currentElement;
    }
  }
  return maxElement;
};

const getBarHeight = function (maxHeight, playerPoint, maxPlayerPoint) {
  return (maxHeight * playerPoint) / maxPlayerPoint;
};

const renderRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const renderText = function (ctx, x, y, string) {
  ctx.font = `${Font.SIZE} ${Font.FAMILY}`;
  ctx.textBaseline = `hanging`;
  ctx.fillStyle = Color.TEXT;
  ctx.fillText(string, x, y);
};

const renderCloud = function (ctx) {
  renderRect(
      ctx,
      CloudProperty.X + 10,
      CloudProperty.Y + 10,
      CloudProperty.WIDTH,
      CloudProperty.HEIGHT,
      Color.SHADOW
  );
  renderRect(
      ctx,
      CloudProperty.X,
      CloudProperty.Y,
      CloudProperty.WIDTH,
      CloudProperty.HEIGHT,
      Color.CLOUD
  );
};

const renderCongratulations = function (ctx) {
  renderText(
      ctx,
      CloudProperty.X + BAR_GAP,
      CloudProperty.Y + TEXT_GAP,
      Congratulation.FIRST_STRING
  );
  renderText(
      ctx,
      CloudProperty.X + BAR_GAP,
      CloudProperty.Y + TEXT_GAP * 2,
      Congratulation.SECOND_STRING
  );
};

const renderBar = function (ctx, players, points) {
  const maxPoint = getMaxElement(points);

  for (let i = 0; i < players.length; i++) {
    const barHeight = getBarHeight(BarSize.MAX_HEIGHT, points[i], maxPoint);
    const randomSaturation = getSaturation(Color.SATURATION_MIN, Color.SATURATION_MAX);
    const barColor = (players[i] === `Вы`) ? Color.YOU_BAR : `hsl(240, ${randomSaturation}%, 50%)`;

    renderText(
        ctx,
        CloudProperty.X + BAR_GAP + (BarSize.WIDTH + BAR_GAP) * i,
        CloudProperty.Y + CloudProperty.HEIGHT - TEXT_GAP * 1.5,
        players[i]
    );

    renderRect(
        ctx,
        CloudProperty.X + BAR_GAP + (BarSize.WIDTH + BAR_GAP) * i,
        CloudProperty.Y + CloudProperty.HEIGHT - barHeight - TEXT_GAP * 2,
        BarSize.WIDTH,
        barHeight,
        barColor
    );

    renderText(
        ctx,
        CloudProperty.X + BAR_GAP + (BarSize.WIDTH + BAR_GAP) * i,
        CloudProperty.Y + CloudProperty.HEIGHT - barHeight - TEXT_GAP * 3,
        Math.round(points[i])
    );
  }
};

window.renderStatistics = function (ctx, players, points) {
  renderCloud(ctx);
  renderCongratulations(ctx);
  renderBar(ctx, players, points);
};
