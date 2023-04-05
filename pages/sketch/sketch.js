// P_4_3_1_02
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * pixel mapping. each pixel is translated into a new element (svg file).
 * take care to sort the svg file according to their greyscale value.
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var shapes;
var img;

function preload() {
  img = loadImage('data/pic.png');

  shapes = [];
  shapes.push(loadImage('data/value-13.svg'));
  shapes.push(loadImage('data/value-12.svg'));
  shapes.push(loadImage('data/value-11.svg'));
  shapes.push(loadImage('data/value-10.svg'));
  shapes.push(loadImage('data/value-9.svg'));
  shapes.push(loadImage('data/value-8.svg'));
  shapes.push(loadImage('data/value-7.svg'));
  shapes.push(loadImage('data/value-6.svg'));
  shapes.push(loadImage('data/value-5.svg'));
  shapes.push(loadImage('data/value-4.svg'));
  shapes.push(loadImage('data/value-3.svg'));
  shapes.push(loadImage('data/value-2.svg'));
  shapes.push(loadImage('data/value-1.svg'));
}

function setup() {
  createCanvas(600, 900);
  image(img);
}

function draw() {
  background(255);

  for (var gridX = 0; gridX < img.width; gridX++) {
    for (var gridY = 0; gridY < img.height; gridY++) {
      // grid position + title size
      var titleWidth = 603 / img.width;
      var titleHeight = 873 / img.height;
      var posX = titleWidth * gridX;
      var posY = titleHeight * gridY;

      // get current color
      img.loadPixels();
      var c = img.get(min(gridX, img.width - 1), gridY);
      // greyscale conversion
      var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);
      var gradientToIndex = round(map(greyscale, 0, 255, 0, shapes.length - 1));
      image(shapes[gradientToIndex], posX, posY, titleWidth, titleHeight);
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
