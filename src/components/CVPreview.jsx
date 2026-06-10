import React from 'react';

export default function CVPreview({ data }) {
  return (
    <div className="preview-section">
      <div className="cv-document" id="cv-print-area">
        <div className="cv-text-section">
          <h3 className="cv-text-header">PERSONAL INFORMATION</h3>
          <div className="cv-text-item"><strong>Name:</strong> {data.personal.fullName}</div>
          <div className="cv-text-item"><strong>Nationality:</strong> {data.personal.nationality}</div>
          <div className="cv-text-item"><strong>Resident of:</strong> {data.personal.residentOf}</div>
          <div className="cv-text-item"><strong>Birth date:</strong> {data.personal.dob}</div>
          <div className="cv-text-item"><strong>Gender:</strong> {data.personal.gender}</div>
          <div className="cv-text-item"><strong>Marital Status:</strong> {data.personal.maritalStatus}</div>
          <div className="cv-text-item"><strong>Email:</strong> {data.personal.email}</div>
          <div className="cv-text-item"><strong>Phone:</strong> {data.personal.phone}</div>
        </div>

        <div className="cv-separator">________________________________________</div>

        <div className="cv-text-section">
          <h3 className="cv-text-header">PROFESSIONAL EXPERIENCE</h3>
          {data.experience.map((exp, i) => (
            <div key={i} className="cv-experience-entry">
              <div className="cv-exp-header-text">
                <strong>{exp.period}: {exp.title}</strong>
                <div>{exp.company}</div>
                <div>{exp.location}</div>
              </div>
              
              {exp.summary && <p className="cv-exp-summary">{exp.summary}</p>}
              
              {exp.responsibilities && (
                <div className="cv-exp-list">
                  {exp.responsibilities.split('\n').filter(r => r.trim()).map((line, li) => (
                    <div key={li} className="cv-list-item">
                      {li + 1}. {line}
                    </div>
                  ))}
                </div>
              )}
              {i < data.experience.length - 1 && <div className="cv-separator">________________________________________</div>}
            </div>
          ))}
        </div>

        <div className="cv-separator">________________________________________</div>

        <div className="cv-text-section">
          <h3 className="cv-text-header">EDUCATION BACKGROUND</h3>
          {data.education.map((edu, i) => (
            <div key={i} className="cv-education-entry">
              <div className="cv-edu-header-text">
                <strong>{edu.date}: {edu.institution}, {edu.location}</strong>
                <div>{edu.degree}</div>
                {edu.details && <div>{edu.details}</div>}
              </div>
              {i < data.education.length - 1 && <div className="cv-separator">________________________________________</div>}
            </div>
          ))}
        </div>

        <div className="cv-separator">________________________________________</div>

        <div className="cv-text-section">
          <h3 className="cv-text-header">SKILLS</h3>
          <table className="cv-simple-table">
            <thead>
              <tr>
                <th>Skill</th>
                <th>Level</th>
                <th>Years practiced</th>
              </tr>
            </thead>
            <tbody>
              {data.skills.map((skill, i) => (
                <tr key={i}>
                  <td>{skill.name}</td>
                  <td>{skill.level}</td>
                  <td>{skill.years}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cv-separator">________________________________________</div>

        <div className="cv-text-section">
          <h3 className="cv-text-header">LANGUAGES</h3>
          <table className="cv-simple-table">
            <thead>
              <tr>
                <th>Language</th>
                <th>Listening</th>
                <th>Reading</th>
                <th>Writing</th>
                <th>Speaking</th>
              </tr>
            </thead>
            <tbody>
              {data.languages.map((lang, i) => (
                <tr key={i}>
                  <td>{lang.name}</td>
                  <td>{lang.listening}</td>
                  <td>{lang.reading}</td>
                  <td>{lang.writing}</td>
                  <td>{lang.speaking}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.hobbies && data.hobbies.length > 0 && data.hobbies.some(h => h.name) && (
          <>
            <div className="cv-separator">________________________________________</div>

            <div className="cv-text-section">
              <h3 className="cv-text-header">HOBBIES & INTERESTS</h3>
              <div className="cv-exp-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '0.5rem' }}>
                {data.hobbies.filter(h => h.name).map((hobby, i) => (
                  <div key={i} className="cv-list-item" style={{ margin: 0, fontWeight: '500' }}>
                    • {hobby.name}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="cv-text-section">
          <h3 className="cv-text-header">REFERENCES</h3>
          <table className="cv-simple-table">
            <thead>
              <tr>
                <th>Reference Name</th>
                <th>Position</th>
                <th>Phone</th>
                <th>E-Mail</th>
              </tr>
            </thead>
            <tbody>
              {data.references.map((ref, i) => (
                <tr key={i}>
                  <td><strong>{ref.name}</strong></td>
                  <td>{ref.position}</td>
                  <td>{ref.phone}</td>
                  <td>{ref.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cv-footer-clean">
          <p>I certify that the information provided in this CV is accurate.</p>
          <div className="cv-footer-name">
            {data.personal.fullName}
          </div>
        </div>
      </div>
    </div>
  );
}
