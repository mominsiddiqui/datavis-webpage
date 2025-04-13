import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TypingData {
  student: string;
  timeBlock: string;
  wpm: number;
  color: string;
}

export const TypingVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing visualization
    d3.select(svgRef.current).selectAll("*").remove();

    // Create a tooltip div that is hidden by default
    const tooltip = d3.select("body").append("div")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.8)") // Black translucent background
      .style("color", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "10px") // Increased padding for a bigger tooltip
      .style("border-radius", "5px")
      .style("box-shadow", "0 0 10px rgba(0,0,0,0.5)")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Set up dimensions
    const margin = { top: 20, right: 120, bottom: 40, left: 90 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Load and process data
    d3.csv<TypingData>('/typing_data.csv', d3.autoType).then((data: TypingData[]) => {
      // Get unique students for y-axis
      const students = Array.from(new Set(data.map(d => d.student)));
      
      // Create scales
      const y = d3.scaleBand()
        .domain(students)
        .range([0, height])
        .padding(0.1);

      const x = d3.scaleLinear()
        .domain([0, 60]) // Time range in minutes
        .range([0, width]);

      // Add X axis
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .append('text')
        .attr('x', width / 2)
        .attr('y', 35)
        .attr('fill', 'black')
        .style('font-size', '16px')
        .text('Time (minutes)');

      // Add Y axis
      svg.append('g')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -70)
        .attr('x', -height / 2)
        .attr('fill', 'black')
        .style('font-size', '16px')
        .text('Student');

      // Add legend
      const legendData = [
        { color: '#0000FF', label: 'Tone' },
        { color: '#FF0000', label: 'Review' },
        { color: '#FFFF00', label: 'Elaboration' },
        { color: '#008000', label: 'Structuring' },
        { color: '#000000', label: 'No-AI' }
      ];

      const legend = svg.append('g')
        .attr('transform', `translate(${width + 15}, 0)`);  // Moved legend further to the left

      legend.selectAll('rect')
        .data(legendData)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => i * 25)
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', d => d.color);

      // Add label text (move these closer to the color boxes since we removed the color text)
      legend.selectAll('.label-text')
        .data(legendData)
        .enter()
        .append('text')
        .attr('class', 'label-text')
        .attr('x', 25)  // Changed from 90 to 25 to move labels closer to color boxes
        .attr('y', (d, i) => i * 25 + 15)
        .text(d => d.label)
        .style('font-size', '12px')  // Changed from '14px' to '12px' to make text smaller
        .attr('alignment-baseline', 'middle');

      // Add circles
      svg.selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', d => {
          const timeRange = d.timeBlock.split('-');
          const midpoint = (parseInt(timeRange[0]) + parseInt(timeRange[1])) / 2;
          return x(midpoint);
        })
        .attr('cy', d => y(d.student)! + y.bandwidth() / 2)
        .attr('r', d => d.wpm/2)
        .attr('fill', d => d.color)
        .attr('opacity', 0.7)
        .on('mouseover', (event, d) => {
          // Dim all circles
          svg.selectAll('circle')
            .transition()
            .duration(200)
            .attr('opacity', 0.2);
          
          // Highlight circles of the same color
          svg.selectAll('circle')
            .filter((circle: any) => circle.color === d.color)
            .transition()
            .duration(200)
            .attr('opacity', 1);

          let activity;
          switch (d.color) {
            case '#0000FF':
              activity = 'AI Tone Transformation Help';
              break;
            case '#FF0000':
              activity = 'AI Review Help';
              break;
            case '#FFFF00':
              activity = 'AI Elaboration Help';
              break;
            case '#008000':
              activity = 'AI Structuring Help';
              break;
            default:
              activity = 'Student Writing Alone';
          }
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip.html(`${activity}<br>WPM: ${d.wpm}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on('mouseout', () => {
          // Reset all circles to original opacity
          svg.selectAll('circle')
            .transition()
            .duration(500)
            .attr('opacity', 0.7);
            
          tooltip.transition().duration(500).style("opacity", 0);
        });
    });

  }, []);

  return <svg ref={svgRef}></svg>;
};