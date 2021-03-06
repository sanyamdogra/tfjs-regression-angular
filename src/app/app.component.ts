import { Component } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tensorflowApp';
  linearModel: tf.Sequential;
  prediction: any;

  ngOnInit() {
    this.trainNewModel();
  }

  async trainNewModel() {
    this.linearModel = tf.sequential();// Session
    this.linearModel.add(tf.layers.dense({ units: 1, inputShape: [1] }));// Layering

    this.linearModel.compile({ loss: 'meanSquaredError', optimizer: 'sgd' }); //sgd = stochastic gradient descent

    // Training
    const xs = tf.tensor1d([3.2, 4.4, 5.5, 6.71, 6.98, 7.168, 9.779, 6.182, 7.59, 2.16, 7.042, 10.71, 5.313, 7.97, 5.654, 9.7, 3.11]);
    const ys = tf.tensor1d([1.6, 2.7, 2.9, 3.19, 1.684, 2.53, 3.366, 2.596, 2.53, 1.22, 2.87, 3.45, 1.65, 2.904, 2.42, 2.4, 1.31]);

    await this.linearModel.fit(xs, ys);
    console.log("Model Trained!");

  }

  linearPrediction(val) {
    const output = this.linearModel.predict(tf.tensor2d([val], [1, 1], "int32")) as any;
    this.prediction = Array.from(output.dataSync())[0]

  }


}
