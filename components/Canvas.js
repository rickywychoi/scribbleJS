import React, { Component, Fragment, createRef } from 'react';
import classes from '../css/GameRoom/gameRoom.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.jsCanvas = createRef();

    this.state = {
      painting: false,
      isEraser: false,
      now: 0,
      x_value: 0,
      y_value: 0
    }

    this.onMouseMove = this.onMouseMove.bind(this);
    this.doPainting = this.doPainting.bind(this);
    this.stopPainting = this.stopPainting.bind(this);
    this.canvasEventListener = this.canvasEventListener.bind(this);
  }

  onMouseMove = (event) => {
    const canvas = this.jsCanvas.current;
    const ctx = canvas.getContext('2d');

    if (event) {
      const x = event.offsetX;
      const y = event.offsetY;

      const { painting, now, x_value, y_value } = this.state;
  
      let timestamp = Date.now();

      if (timestamp - now > 1000 || Math.abs(x - x_value) > 10 || Math.abs(y - y_value) > 10) {
        this.setState({ 
          now: timestamp,
          x_value: x,
          y_value: y
        });
      }
  
      if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x_value, y_value);
      } else {
        ctx.lineTo(x_value, y_value);
        ctx.stroke();
      }
    }
  }

  doPainting = () => {
    this.setState({ painting: true });
  }

  stopPainting = () => {
    this.setState({ painting: false });
  }

  canvasEventListener = () => {
    const canvas = this.jsCanvas.current;
    if (canvas) {
      canvas.addEventListener("mousemove", this.onMouseMove);
      canvas.addEventListener("mousedown", this.doPainting);
      canvas.addEventListener("mouseup", this.stopPainting);
      canvas.addEventListener("mouseleave", this.stopPainting);
    }
  }

  componentDidMount() {
    const canvas = this.jsCanvas.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 800; // width of canvas set in css
    canvas.height = 500; // height of canvas set in css

    ctx.strokeStyle = "#2c2c2c";
    ctx.lineWidth = 15.0;
  }
  
  componentDidUpdate() {
    this.canvasEventListener();
  }

  render() {
    return(
    <Fragment>
      <div className={classes.mainBody}>
        <canvas ref={this.jsCanvas} className={classes.canvas}></canvas>
        <div className={classes.controls}>
            <div className={classes.controls_range}>
                {/* <input type="range" id="jsRange" min="0.1" max="30.0" value="15.0" step="0.5"></input> */}
            </div>
            <div className={classes.controls_erasers_btns}>
                <div className={classes.controls_erasers}>
                    <button id="jsEraser" onClick={this.toggleEraser}>Eraser</button>
                    <div className={classes.controls_eraser} id="e_xs"></div>
                    <div className={classes.controls_eraser} id="e_s"></div>
                    <div className={classes.controls_eraser} id="e_m"></div>
                    <div className={classes.controls_eraser} id="e_l"></div>
                    <div className={classes.controls_eraser} id="e_xl"></div>
                </div>
                <div className={classes.controls_btns}>
                    <button id="jsFill" onClick={this.fillWithColor}>Fill</button>
                    <button id="jsClear" onClick={this.clearCanvas}>Clear</button>
                </div>
            </div>
            <div className={classes.controls_colors} id="jsColors">
                <div className={classes.controls_color} style={{ backgroundColor: "#2c2c2c" }}></div>
                <div className={classes.controls_color} style={{ backgroundColor: "#fff" }}></div>
                <div className={classes.controls_color} style={{ backgroundColor: "rgb(255,59,48)" }}></div>
                <div className={classes.controls_color} style={{ backgroundColor: "rgb(255,149,0)" }}></div>
                <div className={classes.controls_color} style={{ backgroundColor: "rgb(255,204,0)" }}></div>
                <div className={classes.controls_color} style={{ backgroundColor: "rgb(76,217,100)" }}></div>
                <div className={classes.controls_color} style={{ backgroundColor: "rgb(90,200,250)" }}></div>
                <div className={classes.controls_color} style={{ backgroundColor: "rgb(0,122,255)" }}></div>
                <div className={classes.controls_color} style={{ backgroundColor: "rgb(88,86,214)" }}></div>
            </div>
        </div>
      </div>
    </Fragment>
    );
  }
}

export default Canvas;