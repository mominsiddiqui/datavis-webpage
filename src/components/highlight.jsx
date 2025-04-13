import { useState } from 'react';
import './viz.css';


const AugmentedEssayViz = () => {
  // Replace the essay state with advertisingEssays array and add currentEssayIndex state
  const advertisingEssays = [
    {
      title: "The Evolution and Impact of Advertising in Digital Media",
      paragraphs: [
        {
          id: 1,
          sentences: [
            { id: 101, text: "Recent advances in digital technology have transformed how companies approach advertising and marketing strategies.", source: "student" },
            { id: 102, text: "The integration of artificial intelligence and data analytics into advertising campaigns presents both opportunities and challenges for marketers and consumers alike.", source: "llm" },
            { id: 103, text: "This paper examines the impact of digital transformation on advertising effectiveness and explores the economic implications of this technological shift.", source: "mixed", studentEdits: 2, llmEdits: 1 }
          ],
          metrics: { studentInserts: 45, studentDeletes: 12, llmInserts: 67, studentLlmDeletes: 23 }
        },
        {
          id: 2,
          sentences: [
            { id: 201, text: "The rise of programmatic advertising has fundamentally altered the landscape of marketing communications.", source: "llm" },
            { id: 202, text: "Prior research has established that effective advertising is a complex process that involves targeting, messaging, and measurement (Keller & Kotler, 2016).", source: "student" },
            { id: 203, text: "Traditional approaches to advertising have emphasized these elements while focusing on broad demographic appeal.", source: "student" },
            { id: 204, text: "However, digital platforms have increasingly personalized these processes over the past two decades, with AI-driven optimization representing the latest evolution of this trend.", source: "llm", rejected: true }
          ],
          metrics: { studentInserts: 78, studentDeletes: 34, llmInserts: 42, studentLlmDeletes: 18 }
        },
        {
          id: 3,
          sentences: [
            { id: 301, text: "This study employed a mixed-methods approach to analyze advertising performance across digital channels.", source: "student" },
            { id: 302, text: "We collected campaign data from 120 brands across three industry sectors: retail, technology, and consumer packaged goods.", source: "mixed", studentEdits: 3, llmEdits: 2 },
            { id: 303, text: "Each campaign was processed using specialized analytics software that identified and categorized performance metrics as either organic or paid media-generated.", source: "llm" },
            { id: 304, text: "The tracking system recorded four primary metrics: impression reach, engagement rates, conversion rates, and return on advertising spend (ROAS).", source: "llm" }
          ],
          metrics: { studentInserts: 27, studentDeletes: 8, llmInserts: 93, studentLlmDeletes: 41 }
        },
        {
          id: 4,
          sentences: [
            { id: 401, text: "Analysis revealed significant patterns of advertising effectiveness across different industry sectors.", source: "mixed", studentEdits: 1, llmEdits: 1 },
            { id: 402, text: "Retail brands showed the highest proportion of social media-generated engagement (68%) and were more likely to benefit from influencer marketing (37% higher conversion rate).", source: "student" },
            { id: 403, text: "In contrast, technology companies relied more heavily on search advertising, with only 42% of conversions being social media-originated.", source: "llm" },
            { id: 404, text: "Consumer packaged goods demonstrated a middle ground, with approximately equal contributions from search and social media channels.", source: "llm", modified: true }
          ],
          metrics: { studentInserts: 52, studentDeletes: 15, llmInserts: 81, studentLlmDeletes: 37 }
        },
        {
          id: 5,
          sentences: [
            { id: 501, text: "These findings suggest that the nature of digital advertising effectiveness varies significantly by industry and platform type.", source: "llm" },
            { id: 502, text: "Brands in sectors requiring more emotional connection and visual appeal (retail) appear to benefit more from social and influencer channels, while those in sectors with more information-seeking customers (technology) show higher reliance on search-optimized content.", source: "student" },
            { id: 503, text: "Furthermore, the data indicates that advertisers across all industries employ strategic multichannel approaches, suggesting a level of sophisticated campaign integration rather than single-platform dependence.", source: "mixed", studentEdits: 4, llmEdits: 2 }
          ],
          metrics: { studentInserts: 84, studentDeletes: 26, llmInserts: 59, studentLlmDeletes: 21 }
        },
        {
          id: 6,
          sentences: [
            { id: 601, text: "In conclusion, this research demonstrates that modern advertising represents a complex ecosystem of platforms, messages, and measurement frameworks.", source: "llm" },
            { id: 602, text: "While concerns about digital advertising efficiency are valid, our findings suggest that most brands engage strategically with digital tools, making deliberate choices about which channels to prioritize, how to allocate budgets, and which metrics determine success.", source: "student" },
            { id: 603, text: "Future marketing approaches should acknowledge this new digital paradigm and focus on developing more integrated measurement models rather than attempting to evaluate channels in isolation.", source: "mixed", studentEdits: 2, llmEdits: 1 }
          ],
          metrics: { studentInserts: 38, studentDeletes: 17, llmInserts: 36, studentLlmDeletes: 14 }
        }
      ]
    },
    {
      title: "Consumer Behavior and Digital Advertising Effectiveness",
      paragraphs: [
        {
          id: 1,
          sentences: [
            { id: 101, text: "Recent advances in digital technology have revolutionized how consumers interact with advertisements across multiple platforms.", source: "llm" },
            { id: 102, text: "The proliferation of personalized ad experiences driven by machine learning algorithms presents both opportunities and ethical concerns for marketers and society.", source: "student" },
            { id: 103, text: "This paper investigates the relationship between consumer data privacy and advertising effectiveness in the modern digital landscape.", source: "mixed", studentEdits: 1, llmEdits: 3 }
          ],
          metrics: { studentInserts: 53, studentDeletes: 19, llmInserts: 42, studentLlmDeletes: 15 }
        },
        {
          id: 2,
          sentences: [
            { id: 201, text: "The emergence of cross-device tracking has fundamentally transformed how brands measure consumer journey touchpoints.", source: "student" },
            { id: 202, text: "Prior studies have demonstrated that effective digital advertising requires balancing personalization with privacy concerns (Smith & Johnson, 2022).", source: "llm" },
            { id: 203, text: "Traditional advertising metrics focused primarily on reach and frequency, often overlooking qualitative engagement factors.", source: "llm" },
            { id: 204, text: "However, contemporary measurement frameworks now incorporate sentiment analysis, attention metrics, and privacy compliance indicators as essential components.", source: "student", rejected: true }
          ],
          metrics: { studentInserts: 64, studentDeletes: 28, llmInserts: 57, studentLlmDeletes: 22 }
        },
        {
          id: 3,
          sentences: [
            { id: 301, text: "Our investigation employed a multi-platform approach to analyze consumer responses to varying levels of ad personalization.", source: "llm" },
            { id: 302, text: "We collected behavioral data from 150 participants across three demographic segments: Gen Z, Millennials, and Gen X consumers.", source: "mixed", studentEdits: 4, llmEdits: 1 },
            { id: 303, text: "Each participant was exposed to advertisements with varying degrees of personalization, from contextual targeting to identity-based personalization.", source: "student" },
            { id: 304, text: "The analysis framework measured four primary indicators: click-through rate, conversion rate, ad recall percentage, and the increasingly important privacy sentiment score.", source: "student" }
          ],
          metrics: { studentInserts: 89, studentDeletes: 31, llmInserts: 47, studentLlmDeletes: 18 }
        },
        {
          id: 4,
          sentences: [
            { id: 401, text: "Results revealed distinct patterns of consumer response across different age demographics and personalization approaches.", source: "mixed", studentEdits: 2, llmEdits: 2 },
            { id: 402, text: "Gen Z participants demonstrated the highest sensitivity to privacy concerns (72% expressed discomfort) yet paradoxically showed the strongest engagement with hyper-personalized content.", source: "llm" },
            { id: 403, text: "In contrast, Gen X consumers exhibited greater tolerance for data collection but responded most positively to contextual rather than behavioral targeting approaches.", source: "student" },
            { id: 404, text: "Millennial participants occupied a middle ground, with their responses heavily influenced by brand transparency regarding data usage policies.", source: "student", modified: true }
          ],
          metrics: { studentInserts: 76, studentDeletes: 24, llmInserts: 63, studentLlmDeletes: 29 }
        },
        {
          id: 5,
          sentences: [
            { id: 501, text: "These findings indicate that effective digital advertising strategies must be tailored not only to demographic segments but also to varying privacy sensitivity thresholds.", source: "student" },
            { id: 502, text: "Brands achieving the highest engagement metrics consistently employed transparent data practices and offered meaningful value exchanges for consumer information.", source: "llm" },
            { id: 503, text: "Furthermore, our analysis suggests that the most successful campaigns balanced personalization precision with clear privacy controls, creating what we term 'consensual personalization' frameworks.", source: "mixed", studentEdits: 3, llmEdits: 3 }
          ],
          metrics: { studentInserts: 92, studentDeletes: 33, llmInserts: 41, studentLlmDeletes: 16 }
        },
        {
          id: 6,
          sentences: [
            { id: 601, text: "In conclusion, this research demonstrates that the future of digital advertising lies at the intersection of personalization sophistication and privacy stewardship.", source: "student" },
            { id: 602, text: "While technological capabilities for granular targeting continue to advance, our findings suggest that consumer trust remains the fundamental currency of effective advertising engagement.", source: "llm" },
            { id: 603, text: "Future advertising frameworks should prioritize developing what we call 'privacy-enhanced personalization' - approaches that deliver relevance without sacrificing ethical data practices or consumer autonomy.", source: "mixed", studentEdits: 1, llmEdits: 3 }
          ],
          metrics: { studentInserts: 67, studentDeletes: 22, llmInserts: 49, studentLlmDeletes: 20 }
        }
      ]
    }
  ];

  // Add state for current essay index
  const [currentEssayIndex, setCurrentEssayIndex] = useState(0);
  const currentEssay = advertisingEssays[currentEssayIndex];

  // Toggle visualization options
  const [visualizationOptions, setVisualizationOptions] = useState({
    showSourceHighlighting: true,
    showMarginMetrics: true,
  });

  // Add new state for overall visibility
  const [showVisualizations, setShowVisualizations] = useState(true);

  // Navigation functions
  const goToNextEssay = () => {
    setCurrentEssayIndex((prevIndex) => 
      prevIndex < advertisingEssays.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const goToPreviousEssay = () => {
    setCurrentEssayIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const toggleOption = (option) => {
    setVisualizationOptions({
      ...visualizationOptions,
      [option]: !visualizationOptions[option]
    });
  };

  // Function to get sentence style based on source and visualization options
  const getSentenceStyle = (sentence) => {
    if (!showVisualizations || !visualizationOptions.showSourceHighlighting) return {};

    // Base styles for different sources
    if (sentence.source === "student") {
      return { backgroundColor: "rgba(59, 130, 246, 0.15)" }; // Light blue for student
    } else if (sentence.source === "llm") {
      // If it was rejected or heavily modified
      if (sentence.rejected) {
        return { 
          backgroundColor: "rgba(239, 68, 68, 0.15)", 
          textDecoration: "line-through",
          color: "#888"
        }; // Strikethrough red for rejected LLM
      } else if (sentence.modified) {
        return { 
          backgroundColor: "rgba(239, 68, 68, 0.15)",
          borderBottom: "2px dashed #ef4444"
        }; // Red with dashed underline for modified LLM
      }
      return { backgroundColor: "rgba(239, 68, 68, 0.15)" }; // Light red for LLM
    } else if (sentence.source === "mixed") {
      return { backgroundColor: "rgba(234, 179, 8, 0.15)" }; // Light yellow for mixed
    }
    
    return {};
  };

  // Generate margin annotations for edits
  const generateEditMarkers = (sentence) => {
    if (!visualizationOptions.showEditCounts || sentence.source !== "mixed") return null;
    
    return (
      <div className="inline-flex ml-2 items-center">
        <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 mr-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
          {sentence.studentEdits}
        </span>
        <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-red-100 text-red-800">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
          {sentence.llmEdits}
        </span>
      </div>
    );
  };

  // Calculate total metrics for the essay
  const totalMetrics = currentEssay.paragraphs.reduce(
    (acc, paragraph) => {
      return {
        studentInserts: acc.studentInserts + (paragraph.metrics.studentInserts || 0),
        studentDeletes: acc.studentDeletes + (paragraph.metrics.studentDeletes || 0),
        llmInserts: acc.llmInserts + (paragraph.metrics.llmInserts || 0),
        studentLlmDeletes: acc.studentLlmDeletes + (paragraph.metrics.studentLlmDeletes || 0)
      };
    },
    { studentInserts: 0, studentDeletes: 0, llmInserts: 0, studentLlmDeletes: 0 }
  );

  // Calculate percentages
  const totalInserts = totalMetrics.studentInserts + totalMetrics.llmInserts;
  const studentPercentage = Math.round((totalMetrics.studentInserts / totalInserts) * 100);
  const llmPercentage = 100 - studentPercentage;
  const llmRetentionRate = Math.round(
    ((totalMetrics.llmInserts - totalMetrics.studentLlmDeletes) / totalMetrics.llmInserts) * 100
  );

  return (
    <div className="viz-container">
      <div className="controls">
        <div className="header">
          <h1 className="title">{currentEssay.title}</h1>
          <button
            className={`viz-button ${showVisualizations ? 'active' : 'inactive'}`}
            onClick={() => {
              setShowVisualizations(!showVisualizations);
              if (!showVisualizations) {
                setVisualizationOptions({
                  showSourceHighlighting: true,
                  showEditCounts: true,
                  showMarginMetrics: true,
                  showHeatmapSidebar: true
                });
              } else {
                setVisualizationOptions({
                  showSourceHighlighting: false,
                  showEditCounts: false,
                  showMarginMetrics: false,
                  showHeatmapSidebar: false
                });
              }
            }}
          >
            {showVisualizations ? 'Hide Visualizations' : 'Show Visualizations'}
          </button>
        </div>

        {showVisualizations && (
          <>
            <div className="button-group">
              <button 
                className={`viz-button ${visualizationOptions.showSourceHighlighting ? 'active' : 'inactive'}`}
                onClick={() => toggleOption('showSourceHighlighting')}
              >
                Text Highlighting
              </button>
              <button 
                className={`viz-button ${visualizationOptions.showMarginMetrics ? 'active' : 'inactive'}`}
                onClick={() => toggleOption('showMarginMetrics')}
              >
                Paragraph Metrics
              </button>
            </div>

            <div className="legend">
              <div className="legend-group">
                <div className="legend-item">
                  <div className="legend-color legend-student"></div>
                  <span>Student Text</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color legend-llm"></div>
                  <span>LLM Text</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color legend-mixed"></div>
                  <span>Mixed Authorship</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="essay-content">
        <div className="main-content">
          {currentEssay.paragraphs.map((paragraph, pIndex) => (
            <div className="paragraph" key={paragraph.id}>
              <div className="paragraph-content">
                {paragraph.sentences.map((sentence) => (
                  <span key={sentence.id} 
                    style={getSentenceStyle(sentence)}
                    className="relative"
                  >
                    {sentence.text}{" "}
                    {/* {showVisualizations && visualizationOptions.showEditCounts && generateEditMarkers(sentence)} */}
                  </span>
                ))}
              </div>
              
              {showVisualizations && visualizationOptions.showMarginMetrics && (
                <div 
                  className="paragraph-metrics"
                >
                  <div className="metrics-container">
                    <div className="metrics-row">
                      <span>Student Insert</span>
                      <span className="metrics-value student-insert">{paragraph.metrics.studentInserts || 0}</span>
                    </div>
                    <div className="metrics-row">
                      <span>AI Insert</span>
                      <span className="metrics-value ai-insert">{paragraph.metrics.llmInserts || 0}</span>
                    </div>
                    <div className="metrics-row">
                      <span>Student Delete</span>
                      <span className="metrics-value student-delete">{paragraph.metrics.studentDeletes || 0}</span>
                    </div>
                    <div className="metrics-row">
                      <span>AI Delete</span>
                      <span className="metrics-value ai-delete">{paragraph.metrics.studentLlmDeletes || 0}</span>
                    </div>
                  </div>
                </div>
              )}              
            </div>
          ))}
        </div>
      </div>

      <div className="navigation">
        <button 
          onClick={goToPreviousEssay}
          disabled={currentEssayIndex === 0}
          className="nav-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Previous Essay
        </button>
        
        <div className="nav-counter">
          {currentEssayIndex + 1} of {advertisingEssays.length}
        </div>
        
        <button 
          onClick={goToNextEssay}
          disabled={currentEssayIndex === advertisingEssays.length - 1}
          className="nav-button"
        >
          Next Essay
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AugmentedEssayViz;