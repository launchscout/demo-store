require('dotenv').config()
const eleventySass = require("eleventy-sass");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy({'node_modules/launch-cart/dist/index.js': 'js/launch-cart.js'});
  eleventyConfig.addPassthroughCopy('src/images');

  eleventyConfig.addFilter('convertCentsToDollars', (cents) => {
    return (cents / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})
  });

  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  
  return {
    htmlTemplateEngine: "njk",
    dir: {
      input: "src"
    }
  }
};