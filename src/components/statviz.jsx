import { useState } from 'react';
import * as d3 from 'd3';

// CSS Styles
const styles = {
  container: {
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  row: {
    display: 'flex',
    gap: '24px',
    marginBottom: '24px'
  },
  panel: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: '16px',
    borderRadius: '8px'
  },
  panelTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  progressContainer: {
    marginBottom: '12px'
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
    fontSize: '14px'
  },
  progressBarContainer: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    height: '16px'
  },
  progressBarStudent: {
    height: '16px',
    borderRadius: '4px',
    backgroundColor: '#4285F4'
  },
  progressBarLLM: {
    height: '16px',
    borderRadius: '4px',
    backgroundColor: '#CCCCCC'
  },
  progressBarRetention: {
    height: '16px',
    borderRadius: '4px',
    backgroundColor: '#34A853'
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerText: {
    textAlign: 'center'
  },
  retentionText: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#34A853'
  },
  footer: {
    marginTop: '16px',
    textAlign: 'center',
    color: '#666'
  }
};

// Generate synthetic data for multiple instances
const generateData = (count) => {
  const data = [];
  
  // First entry is the actual data shown in the image
  data.push({
    id: 1,
    title: "Essay #1",
    contentAuthorship: {
      student: 46,
      llm: 54
    },
    llmRetention: 59,
    editCounts: {
      studentInserts: 324,
      llmInserts: 378,
      studentDeletes: 112,
      llmDeletes: 154
    }
  });
  
  // Generate additional synthetic data
  for (let i = 2; i <= count; i++) {
    data.push({
      id: i,
      title: `Essay #${i}`,
      contentAuthorship: {
        student: Math.floor(Math.random() * 70) + 30,
        llm: Math.floor(Math.random() * 70) + 30
      },
      llmRetention: Math.floor(Math.random() * 50) + 40,
      editCounts: {
        studentInserts: Math.floor(Math.random() * 400) + 100,
        llmInserts: Math.floor(Math.random() * 400) + 100,
        studentDeletes: Math.floor(Math.random() * 200) + 50,
        llmDeletes: Math.floor(Math.random() * 200) + 50
      }
    });
  }
  
  // Normalize content authorship to sum to 100%
  data.forEach(item => {
    const total = item.contentAuthorship.student + item.contentAuthorship.llm;
    item.contentAuthorship.student = Math.round((item.contentAuthorship.student / total) * 100);
    item.contentAuthorship.llm = 100 - item.contentAuthorship.student;
  });
  
  return data;
};

// Component for horizontal progress bar
const ProgressBar = ({ value, maxValue, barStyle, label, percentage }) => {
  const width = `${(value / maxValue) * 100}%`;
  
  return (
    <div style={styles.progressContainer}>
      <div style={styles.progressLabel}>
        <span>{label}</span>
        {percentage && <span>{value}%</span>}
      </div>
      <div style={styles.progressBarContainer}>
        <div 
          style={{
            ...barStyle,
            width
          }}
        ></div>
      </div>
    </div>
  );
};

// Main Component
const EssayAuthorshipDashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const essayData = generateData(6);
  const currentEssay = essayData[currentIndex];
  
  const handlePrevious = () => {
    setCurrentIndex(prevIndex => 
      prevIndex > 0 ? prevIndex - 1 : essayData.length - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex < essayData.length - 1 ? prevIndex + 1 : 0
    );
  };
  
  // Removed PieChart component
  
  // D3 Bar Chart for Edit Counts - now with percentages
  const BarChart = ({ data }) => {
    const svgRef = (node) => {
      if (node !== null) {
        d3.select(node).selectAll("*").remove();
        
        const width = 600;
        const height = 250;
        const margin = { top: 5, right: 5, bottom: 5, left: 5 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        
        const svg = d3.select(node)
          .attr("width", width)
          .attr("height", height);
        
        const g = svg.append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
        // Calculate total edits to derive percentages
        const totalEdits = data.editCounts.studentInserts + 
                          data.editCounts.llmInserts + 
                          data.editCounts.studentDeletes + 
                          data.editCounts.llmDeletes;
        
        // Prepare data with percentages
        const barData = [
          { 
            category: "Student Inserts", 
            value: Math.round((data.editCounts.studentInserts / totalEdits) * 100), 
            color: "#4285F4" 
          },
          { 
            category: "LLM Inserts", 
            value: Math.round((data.editCounts.llmInserts / totalEdits) * 100), 
            color: "#34A853" 
          },
          { 
            category: "Student Deletes", 
            value: Math.round((data.editCounts.studentDeletes / totalEdits) * 100), 
            color: "#EA4335" 
          },
          { 
            category: "LLM Deletes", 
            value: Math.round((data.editCounts.llmDeletes / totalEdits) * 100), 
            color: "#FBBC05" 
          }
        ];
        
        // Scales
        const x = d3.scaleBand()
          .domain(barData.map(d => d.category))
          .range([0, innerWidth])
          .padding(0.2);
        
        const y = d3.scaleLinear()
          .domain([0, 100])  // Percentage scale from 0-100%
          .range([innerHeight, 0]);
        
        // Axes
        g.append("g")
          .attr("transform", `translate(0, ${innerHeight})`)
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("transform", "rotate(-30)")
          .attr("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em");
        
        g.append("g")
          .call(d3.axisLeft(y).tickFormat(d => d + "%"));
        
        // Bars
        g.selectAll("rect")
          .data(barData)
          .enter()
          .append("rect")
          .attr("x", d => x(d.category))
          .attr("y", d => y(d.value))
          .attr("width", x.bandwidth())
          .attr("height", d => innerHeight - y(d.value))
          .attr("fill", d => d.color);
        
        // Values on top of bars
        g.selectAll("text.bar-value")
          .data(barData)
          .enter()
          .append("text")
          .attr("class", "bar-value")
          .attr("x", d => x(d.category) + x.bandwidth() / 2)
          .attr("y", d => y(d.value) - 5)
          .attr("text-anchor", "middle")
          .text(d => d.value + "%")
          .style("font-size", "12px");
      }
    };
    
    return <svg ref={svgRef}></svg>;
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button 
          style={styles.button}
          onClick={handlePrevious}
        >
          ← Previous
        </button>
        <h1 style={styles.title}>
          {currentEssay.title} Authorship Summary
        </h1>
        <button 
          style={styles.button}
          onClick={handleNext}
        >
          Next →
        </button>
      </div>
      
      <div style={styles.row}>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Content Authorship</h2>
          <div>
            <ProgressBar 
              value={currentEssay.contentAuthorship.student} 
              maxValue={100} 
              barStyle={styles.progressBarStudent} 
              label="Student" 
              percentage={true} 
            />
            <ProgressBar 
              value={currentEssay.contentAuthorship.llm} 
              maxValue={100} 
              barStyle={styles.progressBarLLM} 
              label="LLM" 
              percentage={true} 
            />
          </div>
        </div>
        
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>LLM Retention Rate</h2>
          <div>
            <ProgressBar 
              value={currentEssay.llmRetention} 
              maxValue={100} 
              barStyle={styles.progressBarRetention} 
              label={`${currentEssay.llmRetention}% kept`} 
              percentage={false} 
            />
          </div>
        </div>
      </div>
      
      <div style={styles.panel}>
        <h2 style={styles.panelTitle}>Edit Statistics</h2>
        <div style={styles.chartContainer}>
          <BarChart data={currentEssay} />
        </div>
      </div>
      
      <div style={styles.footer}>
        <p>Showing essay {currentIndex + 1} of {essayData.length}</p>
      </div>
    </div>
  );
};

export default EssayAuthorshipDashboard;