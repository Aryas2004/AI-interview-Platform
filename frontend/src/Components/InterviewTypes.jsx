import { Link } from "react-router-dom";

export const InterviewTypes = () => {
  const cardStyle = {
    boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
    width: "500px",
    padding: "40px",
    borderRadius: "10px",
  };

  const headingStyle = {
    textAlign: "justify",
    fontWeight: "bold",
    fontSize: "40px",
  };

  const paragraphStyle = {
    textAlign: "justify",
    fontSize: "16px",
  };

  const buttonStyle = {
    display: "block",
    backgroundColor: "rgb(92, 162, 219)",
    margin: "20px auto",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "1px solid lightgray",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        margin: "40px",
        padding: "40px",
        gap: "40px",
      }}
    >
      {/* Behavioral */}
      <div style={cardStyle}>
        <h1 style={headingStyle}>Behavioral</h1>
        <p style={paragraphStyle}>
          A Behavioral interview evaluates a candidate's soft skills, work ethic, problem-solving approach,
          leadership potential, and ability to handle workplace situations. It focuses on past experiences and
          behavioral patterns to predict future performance in a professional environment.
        </p>
        <Link style={{ textDecoration: "none" }} to="/interview/behavioral?techStack=behavioral">
          <button style={buttonStyle}>Start Interview</button>
        </Link>
      </div>

      {/* CS Fundamentals */}
      <div style={cardStyle}>
        <h1 style={headingStyle}>CS Fundamentals</h1>
        <p style={paragraphStyle}>
          A CS Fundamentals interview evaluates a candidate's core understanding of computer science concepts
          like data structures, algorithms, operating systems, networking, and system design. It is essential
          for assessing the theoretical and practical problem-solving ability of the candidate.
        </p>
        <Link style={{ textDecoration: "none" }} to="/interview/csfundamentals?techStack=csfund">
          <button style={buttonStyle}>Start Interview</button>
        </Link>
      </div>

      {/* Java */}
      <div style={{ ...cardStyle, marginTop: "40px" }}>
        <h1 style={headingStyle}>Java</h1>
        <p style={paragraphStyle}>
          A Java interview assesses a candidate's expertise in the Java programming language. It evaluates
          their knowledge of core Java concepts, object-oriented programming principles, data structures,
          and algorithms.
        </p>
        <Link style={{ textDecoration: "none" }} to="/interview/java?techStack=java">
          <button style={buttonStyle}>Start Interview</button>
        </Link>
      </div>
    </div>
  );
};
