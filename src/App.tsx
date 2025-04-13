import React from 'react';
import { TypingVisualization } from './components/TypingVisualization';
import AugmentedEssayViz from './components/highlight';
import EssayAuthorshipDashboard from './components/statviz';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="content-column">
        <h1>Visualizing Student-AI Writing Collaboration</h1>
        <h2>Momin Siddiqui, Olivia Hu, and Jinkua Liu </h2>
        
        <p>
        The ubiquity of technologies like ChatGPT has prompted concern among school personnel and parents regarding their use in classrooms [1, 2] . Teachers worry that students will use these generative technologies for doing their assignments [2], thereby circumventing crucial learning steps. While it is not feasible to restrain students from using these tools, there is potential in providing access to them in safe environments that teachers can monitor. In order to provide that affordance for teachers we are exploring a visualization dashboard for student-AI collaboration, specifically, for writing exercises.  
        </p>

        <p>
        Students can use AI for various writing subprocesses, like brainstorming, tone transformation, revision or even research [3]. Through our visualizations, we are interested in investigating if we can showcase the productive struggle made by students while writing with AI using salient visual encodings [4]. We are interested in showing the following metrics: 1) student-AI contribution ratio; 2) writing fluency enabled by AI; 3) engagement with ai feedback. For the purposes of our visualization, we will explore encoding channels from prior text visualization research [5,6, 7, 8] .
        </p>

        <div className="visualization-container">
          <TypingVisualization />
          <div className="chart-caption">
            Figure 1: Visualization of student typing speed and AI assistance patterns over time. 
            Circle size represents typing speed (WPM), and colors indicate different types of AI assistance:
            tone transformation (blue), review (red), elaboration (yellow), and structural guidance (green).
            Gray circles represent independent writing periods. This visualization captures the second metric of interest: writing fluency enabled by AI.
          </div>
        </div>

        <p>
          Above is an example visualization for the second metric of interest. The visualization was constructed using d3.js and is interactive. The x-axis represents time in minutes, and the y-axis represents the student. The circles represent the student's writing speed (WPM) at a given time. The color of the circle represents the type of AI assistance that the student is using. The size of the circle represents the student's writing speed. You can hover over the circles to see more information about the student's writing speed and the type of AI assistance they are using, additionally we spotlight similar circles in other rows as well.
        </p>

        <div className="visualization-container">
          <AugmentedEssayViz />
          <div className="chart-caption">
            Figure 2: Visualization of student-AI collaboration in essay writing. 
            Color highlighting shows text authorship (blue for student, red for AI, yellow for mixed), 
            with additional markers for rejected or modified AI suggestions. 
            This visualization captures the first metric of interest: student-AI contribution ratio.
          </div>
        </div>

        <div className="visualization-container">
          <EssayAuthorshipDashboard />
          <div className="chart-caption">
            Figure 3: Dashboard showing essay authorship statistics. 
            The visualization displays content authorship percentages between student and AI, 
            AI suggestion retention rate, and edit statistics broken down by type.
            This visualization captures the third metric of interest: engagement with AI feedback.
          </div>
        </div>

        <div className="citations">
          <h3>References</h3>
          <p>[1] Susan D'Agostino. 2023. ChatGPT Advice Academics Can Use Now. https://www.insidehighered.com/news/2023/01/12/academic-experts-offeradvice-chatgpt Accessed: Jan 26, 2024.</p>
          <p>[2] Center for Teaching Exellence at The University of Kansas. 2023. Using AI ethically in writing assignments. https://cte.ku.edu/ethical-use-ai-writingassignments Accessed: Jan 26, 2024.</p>
          <p>[3] Scardamalia, Marlene, Carl Bereiter, and Rosanne Steinbach. "Teachability of reflective processes in written composition." Cognitive science 8.2 (1984): 173-190.</p>
          <p>[4] Munzner, Tamara. Visualization analysis and design. CRC press, 2014.</p>
          <p>[5] Hu, Mengdie, Krist Wongsuphasawat, and John Stasko. "Visualizing social media content with sententree." IEEE transactions on visualization and computer graphics 23.1 (2016): 621-630.</p>
          <p>[6] Cao, Nan, et al. "Overview of text visualization techniques." Introduction to text visualization (2016): 11-40.</p>
          <p>[7] Brath, Richard. Visualizing with text. CRC Press, 2020.</p>
          <p>[8] Yau, Nathan. "Text." FlowingData, https://flowingdata.com/tag/text/. Accessed 25 Mar. 2025.</p>
        </div>
      </div>
    </div>
  );
}

export default App;