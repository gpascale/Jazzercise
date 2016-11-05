import React from 'react';
import { Flow as VF } from 'vexflow';
import { Note } from 'teoria'

export default class Score extends React.Component {

  render() {
    return (
      <div className="score" id="score" ref="score">
      </div>
    )
  }

  componentDidMount() {
    console.log('mounted!');
    this.renderer = this._setupVexFlowRenderer();
    var context = this.renderer.getContext();
    this.stave = new VF.Stave(10, 40, 400);
    this.stave.addClef("treble").addTimeSignature("4/4");
    this.stave.setContext(context).draw();
    this._addNotes(context);

    // teoria
    // var a4 = Note('a4');
  }

  _setupVexFlowRenderer() {
    // Create the renderer
    var renderer = new VF.Renderer(this.refs.score, VF.Renderer.Backends.SVG);
    // Configure the rendering context.
    renderer.resize(500, 500);
    var context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    return renderer;
  }

  _addNotes(context) {
    // var system = vf.System();
    // var notes = [
    //   // A quarter-note C.
    //   new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
    //   // A quarter-note D.
    //   new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
    //   // A quarter-note rest. Note that the key (b/4) specifies the vertical
    //   // position of the rest.
    //   new VF.StaveNote({ keys: ["b/4"], duration: "qr" }),
    //   // A C-Major chord.
    //   new VF.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "q" }),
    // ];

    // // Create a voice in 4/4 and add above notes
    // var voice = new VF.Voice({ beat_value: 4 });
    // voice.addTickables(notes);
    // new VF.Formatter().joinVoices([voice]).format([voice], 8¡00);

    // voice.draw(context, this.stave);
    var vf = new VF.Factory({
      renderer: {selector: 'score', width: 500, height: 200}
    });

    var score = vf.EasyScore();
    var system = vf.System();

    system.addStave({
      voices: [
	score.voice(score.notes('C#5/q, B4, A4, G#4', {stem: 'up'})),
      ]
    }).addClef('treble').addTimeSignature('4/4');
    system.addStave({
      voices: [
	score.voice(score.notes('C#4/h, C#4', {stem: 'down'}))
      ]
    }).addClef('treble').addTimeSignature('4/4');

    vf.draw();
  }

}