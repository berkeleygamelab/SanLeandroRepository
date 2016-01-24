//@module
/*
  Copyright 2011-2014 Marvell Semiconductor, Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

exports.pins = {
    PIRinput: { type: "Digital", direction: "input" }
};


exports.configure = function() {
	this.PIRinput.init();
	this.state = -1;
}

exports.read = function() {
	this.state = this.PIRinput.read();
	return this.state;
}

exports.wasPressed = function() {
	var formerState = this.state;
	this.state = this.PIRinput.read();
	if (formerState != this.state) return this.state;
}

exports.wasReleased = function() {
	var formerState = this.state;
	this.state = this.PIRinput.read();
	return ((formerState == 1) && (this.state == 0))
}

exports.close = function() {
	this.PIRinput.close();
}
