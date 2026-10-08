import { useEffect, useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'student-attendance-demo-v1'
const statusOptions = ['Present', 'Late', 'Absent', 'Excused']

const sampleData = {
  students: [
    { id: 's1', rollNo: '22071A0501', name: 'Aditya Varma', email: 'aditya.v@college.edu', dept: 'CSE', semester: 3, section: 'A' },
    { id: 's2', rollNo: '22071A0514', name: 'Bhavana Reddy', email: 'bhavana.r@college.edu', dept: 'CSE', semester: 3, section: 'A' },
    { id: 's3', rollNo: '22071A6602', name: 'Deepika Rao', email: 'deepika.r@college.edu', dept: 'AIML', semester: 3, section: 'A' },
    { id: 's4', rollNo: '22071A6617', name: 'Eshwar Naidu', email: 'eshwar.n@college.edu', dept: 'AIML', semester: 3, section: 'A' },
    { id: 's5', rollNo: '22071A6625', name: 'Farhana Begum', email: 'farhana.b@college.edu', dept: 'AIML', semester: 3, section: 'A' },
    { id: 's6', rollNo: '22071A6640', name: 'Ganesh Kumar', email: 'ganesh.k@college.edu', dept: 'AIML', semester: 3, section: 'A' },
    { id: 's7', rollNo: '22071A1208', name: 'Harini Sai', email: 'harini.s@college.edu', dept: 'IT', semester: 3, section: 'A' },
    { id: 's8', rollNo: '22071A1221', name: 'Ishaan Goud', email: 'ishaan.g@college.edu', dept: 'IT', semester: 3, section: 'A' },
    { id: 's9', rollNo: '22071A0409', name: 'Jyothsna Priya', email: 'jyothsna.p@college.edu', dept: 'ECE', semester: 3, section: 'A' },
    { id: 's10', rollNo: '22071A0437', name: 'Karthik Yadav', email: 'karthik.y@college.edu', dept: 'ECE', semester: 3, section: 'A' },
    { id: 's11', rollNo: '22071A6651', name: 'Lasya Chowdary', email: 'lasya.c@college.edu', dept: 'AIML', semester: 3, section: 'A' },
    { id: 's12', rollNo: '22071A6633', name: 'Manoj Reddy', email: 'manoj.r@college.edu', dept: 'AIML', semester: 3, section: 'A' },
  ],
  faculty: [
    { id: 'f1', name: 'K. Veena', code: 'F101', dept: 'AIML' },
    { id: 'f2', name: 'S. Raghav', code: 'F102', dept: 'CSE' },
    { id: 'f3', name: 'P. Nandini', code: 'F103', dept: 'AIML' },
    { id: 'f4', name: 'M. Kiran', code: 'F104', dept: 'AIML' },
    { id: 'f5', name: 'A. Swathi', code: 'F105', dept: 'CSE' },
  ],
  courses: [
    { id: 'c1', code: 'DBMS', name: 'Database Management Systems', credits: 4, dept: 'AIML', facultyId: 'f1', semester: 3, minAttendance: 75 },
    { id: 'c2', code: 'OS', name: 'Operating Systems', credits: 4, dept: 'CSE', facultyId: 'f2', semester: 3, minAttendance: 75 },
    { id: 'c3', code: 'JAVA', name: 'Object Oriented Programming through Java', credits: 4, dept: 'AIML', facultyId: 'f3', semester: 3, minAttendance: 75 },
    { id: 'c4', code: 'DAV', name: 'Data Analytics and Visualization', credits: 3, dept: 'AIML', facultyId: 'f4', semester: 3, minAttendance: 75 },
    { id: 'c5', code: 'CN', name: 'Computer Networks', credits: 4, dept: 'CSE', facultyId: 'f5', semester: 3, minAttendance: 75 },
  ],
  enrollments: [
    { id: 'e1', courseId: 'c1', studentId: 's3' }, { id: 'e2', courseId: 'c1', studentId: 's4' }, { id: 'e3', courseId: 'c1', studentId: 's5' },
    { id: 'e4', courseId: 'c1', studentId: 's6' }, { id: 'e5', courseId: 'c1', studentId: 's11' }, { id: 'e6', courseId: 'c1', studentId: 's12' },
    { id: 'e7', courseId: 'c2', studentId: 's1' }, { id: 'e8', courseId: 'c2', studentId: 's2' }, { id: 'e9', courseId: 'c2', studentId: 's3' },
    { id: 'e10', courseId: 'c2', studentId: 's4' }, { id: 'e11', courseId: 'c2', studentId: 's5' }, { id: 'e12', courseId: 'c2', studentId: 's7' },
    { id: 'e13', courseId: 'c2', studentId: 's8' }, { id: 'e14', courseId: 'c3', studentId: 's3' }, { id: 'e15', courseId: 'c3', studentId: 's4' },
    { id: 'e16', courseId: 'c3', studentId: 's5' }, { id: 'e17', courseId: 'c3', studentId: 's6' }, { id: 'e18', courseId: 'c3', studentId: 's11' },
    { id: 'e19', courseId: 'c3', studentId: 's12' }, { id: 'e20', courseId: 'c4', studentId: 's9' }, { id: 'e21', courseId: 'c4', studentId: 's10' },
    { id: 'e22', courseId: 'c5', studentId: 's1' }, { id: 'e23', courseId: 'c5', studentId: 's2' }, { id: 'e24', courseId: 'c5', studentId: 's3' },
    { id: 'e25', courseId: 'c5', studentId: 's4' }, { id: 'e26', courseId: 'c5', studentId: 's5' }, { id: 'e27', courseId: 'c5', studentId: 's6' },
  ],
  sessions: [
    { id: 'sess1', courseId: 'c1', date: '2026-08-03', period: 2, topic: 'ER model and keys' },
    { id: 'sess2', courseId: 'c1', date: '2026-08-05', period: 3, topic: 'Relational algebra' },
    { id: 'sess3', courseId: 'c2', date: '2026-08-04', period: 1, topic: 'Process scheduling' },
    { id: 'sess4', courseId: 'c3', date: '2026-08-04', period: 4, topic: 'Classes and objects' },
    { id: 'sess5', courseId: 'c4', date: '2026-08-06', period: 2, topic: 'Data preprocessing' },
    { id: 'sess6', courseId: 'c5', date: '2026-08-06', period: 5, topic: 'Network models' },
  ],
  attendance: [
    { id: 'a1', sessionId: 'sess1', studentId: 's3', status: 'Present' },
    { id: 'a2', sessionId: 'sess1', studentId: 's4', status: 'Present' },
    { id: 'a3', sessionId: 'sess1', studentId: 's5', status: 'Late' },
    { id: 'a4', sessionId: 'sess1', studentId: 's6', status: 'Absent' },
    { id: 'a5', sessionId: 'sess1', studentId: 's11', status: 'Present' },
    { id: 'a6', sessionId: 'sess1', studentId: 's12', status: 'Present' },
    { id: 'a7', sessionId: 'sess3', studentId: 's1', status: 'Present' },
    { id: 'a8', sessionId: 'sess3', studentId: 's2', status: 'Absent' },
    { id: 'a9', sessionId: 'sess3', studentId: 's3', status: 'Present' },
    { id: 'a10', sessionId: 'sess3', studentId: 's4', status: 'Present' },
    { id: 'a11', sessionId: 'sess3', studentId: 's5', status: 'Late' },
    { id: 'a12', sessionId: 'sess3', studentId: 's7', status: 'Absent' },
    { id: 'a13', sessionId: 'sess3', studentId: 's8', status: 'Present' },
  ],
  leaveRequests: [
    { id: 'l1', studentId: 's5', fromDate: '2026-08-10', toDate: '2026-08-11', reason: 'Fever', approvalStatus: 'Approved' },
    { id: 'l2', studentId: 's4', fromDate: '2026-08-18', toDate: '2026-08-18', reason: 'Family function', approvalStatus: 'Pending' },
    { id: 'l3', studentId: 's7', fromDate: '2026-08-21', toDate: '2026-08-22', reason: 'Travel', approvalStatus: 'Rejected' },
  ],
}

function readStorageData() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return sampleData

  try {
    const parsed = JSON.parse(stored)
    return { ...sampleData, ...parsed }
  } catch {
    return sampleData
  }
}

function getCourseRollups(data, courseId) {
  const course = data.courses.find((item) => item.id === courseId)
  const enrolledStudents = data.enrollments.filter((entry) => entry.courseId === courseId).map((entry) => entry.studentId)
  const sessionCount = data.sessions.filter((session) => session.courseId === courseId).length
  const joinedRecords = data.attendance.map((entry) => {
    const session = data.sessions.find((item) => item.id === entry.sessionId)
    if (!session || session.courseId !== courseId) return null
    return { ...entry, courseId }
  }).filter(Boolean)

  const attendanceByStudent = enrolledStudents.map((studentId) => {
    const studentMarks = joinedRecords.filter((rec) => rec.studentId === studentId)
    const total = studentMarks.length
    const attended = studentMarks.filter((rec) => ['Present', 'Late'].includes(rec.status)).length
    const percent = total === 0 ? 0 : Number(((attended / total) * 100).toFixed(2))
    return {
      studentId,
      total,
      attended,
      percent,
      belowMin: percent < (course?.minAttendance ?? 75),
    }
  })

  const average = attendanceByStudent.length
    ? Number((attendanceByStudent.reduce((sum, row) => sum + row.percent, 0) / attendanceByStudent.length).toFixed(2))
    : 0

  return {
    course,
    enrolledStudents,
    sessionCount,
    average,
    belowMinCount: attendanceByStudent.filter((row) => row.belowMin).length,
    attendanceByStudent,
  }
}

function App() {
  const [data, setData] = useState(() => readStorageData())
  const [activeTab, setActiveTab] = useState('overview')
  const [studentForm, setStudentForm] = useState({ rollNo: '', name: '', email: '', dept: 'AIML', semester: 3, section: 'A' })
  const [courseForm, setCourseForm] = useState({ code: '', name: '', dept: 'AIML', facultyId: 'f1', credit: 4, minAttendance: 75 })
  const [sessionForm, setSessionForm] = useState({ courseId: 'c1', date: '2026-08-07', period: 2, topic: '' })
  const [leaveForm, setLeaveForm] = useState({ studentId: 's3', fromDate: '2026-08-12', toDate: '2026-08-12', reason: 'Medical leave' })
  const [attendanceForm, setAttendanceForm] = useState({ courseId: 'c1', sessionId: 'sess1' })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const sessionOptions = data.sessions.filter((session) => session.courseId === attendanceForm.courseId)

  const overviewStats = useMemo(() => {
    const totalStudents = data.students.length
    const totalSessions = data.sessions.length
    const totalCourses = data.courses.length
    const lowAttendanceRows = data.courses.flatMap((course) => {
      const summary = getCourseRollups(data, course.id)
      return summary.attendanceByStudent.filter((row) => row.belowMin)
    })

    return {
      totalStudents,
      totalSessions,
      totalCourses,
      lowAttendanceCount: lowAttendanceRows.length,
    }
  }, [data])

  const lowAttendanceStudents = useMemo(() => {
    return data.courses.flatMap((course) => {
      const summary = getCourseRollups(data, course.id)
      return summary.attendanceByStudent.map((row) => {
        const student = data.students.find((item) => item.id === row.studentId)
        if (!student || !row.belowMin) return null
        return {
          student,
          courseCode: course.code,
          courseName: course.name,
          percent: row.percent,
          minAttendance: course.minAttendance,
        }
      }).filter(Boolean)
    })
  }, [data])

  const courseReports = useMemo(() => {
    return data.courses.map((course) => ({
      ...course,
      ...getCourseRollups(data, course.id),
    }))
  }, [data])

  const markAttendanceForSession = (sessionId, selectedStudents, statusMap) => {
    const nextEntries = []

    selectedStudents.forEach((studentId) => {
      const existing = data.attendance.find((entry) => entry.sessionId === sessionId && entry.studentId === studentId)
      const status = statusMap[studentId] ?? 'Present'
      if (existing) {
        nextEntries.push({ ...existing, status })
      } else {
        nextEntries.push({ id: `a-${Date.now()}-${studentId}`, sessionId, studentId, status })
      }
    })

    setData((current) => {
      const updatedAttendance = [...current.attendance]
      nextEntries.forEach((entry) => {
        const index = updatedAttendance.findIndex((item) => item.sessionId === entry.sessionId && item.studentId === entry.studentId)
        if (index >= 0) updatedAttendance[index] = entry
        else updatedAttendance.push(entry)
      })
      return { ...current, attendance: updatedAttendance }
    })
  }

  const addStudent = (event) => {
    event.preventDefault()
    if (!studentForm.rollNo || !studentForm.name || !studentForm.email) return

    const newStudent = {
      id: `s${Date.now()}`,
      rollNo: studentForm.rollNo,
      name: studentForm.name,
      email: studentForm.email,
      dept: studentForm.dept,
      semester: Number(studentForm.semester),
      section: studentForm.section,
    }

    setData((current) => ({ ...current, students: [...current.students, newStudent] }))
    setStudentForm({ rollNo: '', name: '', email: '', dept: 'AIML', semester: 3, section: 'A' })
  }

  const addCourse = (event) => {
    event.preventDefault()
    if (!courseForm.code || !courseForm.name) return

    const newCourse = {
      id: `c${Date.now()}`,
      code: courseForm.code.toUpperCase(),
      name: courseForm.name,
      dept: courseForm.dept,
      facultyId: courseForm.facultyId,
      semester: 3,
      minAttendance: Number(courseForm.minAttendance),
      credits: Number(courseForm.credit),
    }

    setData((current) => ({ ...current, courses: [...current.courses, newCourse] }))
    setCourseForm({ code: '', name: '', dept: 'AIML', facultyId: 'f1', credit: 4, minAttendance: 75 })
  }

  const addSession = (event) => {
    event.preventDefault()
    if (!sessionForm.courseId || !sessionForm.topic) return

    const newSession = {
      id: `sess${Date.now()}`,
      courseId: sessionForm.courseId,
      date: sessionForm.date,
      period: Number(sessionForm.period),
      topic: sessionForm.topic,
    }

    setData((current) => ({ ...current, sessions: [...current.sessions, newSession] }))
    setSessionForm({ courseId: 'c1', date: '2026-08-07', period: 2, topic: '' })
  }

  const addLeaveRequest = (event) => {
    event.preventDefault()
    if (!leaveForm.studentId || !leaveForm.fromDate || !leaveForm.toDate) return

    const newRequest = {
      id: `l${Date.now()}`,
      studentId: leaveForm.studentId,
      fromDate: leaveForm.fromDate,
      toDate: leaveForm.toDate,
      reason: leaveForm.reason,
      approvalStatus: 'Pending',
    }

    setData((current) => ({ ...current, leaveRequests: [newRequest, ...current.leaveRequests] }))
    setLeaveForm({ studentId: 's3', fromDate: '2026-08-12', toDate: '2026-08-12', reason: 'Medical leave' })
  }

  const approveLeave = (leaveId) => {
    setData((current) => ({
      ...current,
      leaveRequests: current.leaveRequests.map((request) => request.id === leaveId ? { ...request, approvalStatus: 'Approved' } : request),
    }))
  }

  const getStudentAttendanceForCourse = (studentId, courseId) => {
    const total = data.attendance.filter((entry) => {
      const session = data.sessions.find((item) => item.id === entry.sessionId)
      return session && session.courseId === courseId && entry.studentId === studentId
    }).length

    const attended = data.attendance.filter((entry) => {
      const session = data.sessions.find((item) => item.id === entry.sessionId)
      return session && session.courseId === courseId && entry.studentId === studentId && ['Present', 'Late'].includes(entry.status)
    }).length

    return total === 0 ? 0 : Number(((attended / total) * 100).toFixed(2))
  }

  const renderOverview = () => (
    <div className="content-section">
      <div className="header-row">
        <div>
          <p className="eyebrow">Faculty dashboard</p>
          <h2>Student Attendance Management System</h2>
        </div>
        <button type="button" className="primary-btn" onClick={() => setActiveTab('attendance')}>Mark attendance</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card accent">
          <span>Total students</span>
          <strong>{overviewStats.totalStudents}</strong>
          <small>Across all departments</small>
        </div>
        <div className="stat-card">
          <span>Sessions logged</span>
          <strong>{overviewStats.totalSessions}</strong>
          <small>Faculty-created class records</small>
        </div>
        <div className="stat-card">
          <span>Active courses</span>
          <strong>{overviewStats.totalCourses}</strong>
          <small>Semester tracking</small>
        </div>
        <div className="stat-card warning">
          <span>Low-attendance alerts</span>
          <strong>{overviewStats.lowAttendanceCount}</strong>
          <small>Students below minimum</small>
        </div>
      </div>

      <div className="overview-panels">
        <div className="panel">
          <h3>Course overview</h3>
          <div className="list-stack">
            {courseReports.map((course) => (
              <div key={course.id} className="mini-row">
                <div>
                  <strong>{course.code}</strong>
                  <small>{course.name}</small>
                </div>
                <div className="progress-meta">
                  <span>{course.average}% avg</span>
                  <div className="progress-bar">
                    <span style={{ width: `${Math.min(course.average, 100)}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Low attendance alerts</h3>
          <div className="alert-list">
            {lowAttendanceStudents.length ? lowAttendanceStudents.map((row) => (
              <div className="alert-item" key={`${row.student.id}-${row.courseCode}`}>
                <div>
                  <strong>{row.student.name}</strong>
                  <small>{row.student.rollNo} • {row.courseCode}</small>
                </div>
                <span>{row.percent}%</span>
              </div>
            )) : <p className="empty-state">No students are currently below minimum attendance.</p>}
          </div>
        </div>
      </div>
    </div>
  )

  const renderStudents = () => (
    <div className="content-section two-column">
      <div className="panel">
        <h3>Add student</h3>
        <form className="stack-form" onSubmit={addStudent}>
          <input value={studentForm.rollNo} onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })} placeholder="Roll number" />
          <input value={studentForm.name} onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })} placeholder="Full name" />
          <input value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} placeholder="Email address" />
          <div className="inline-fields">
            <select value={studentForm.dept} onChange={(e) => setStudentForm({ ...studentForm, dept: e.target.value })}>
              <option value="AIML">AIML</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
            </select>
            <input value={studentForm.semester} type="number" min="1" max="8" onChange={(e) => setStudentForm({ ...studentForm, semester: e.target.value })} />
            <input value={studentForm.section} maxLength="1" onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value.toUpperCase() })} placeholder="Section" />
          </div>
          <button type="submit" className="primary-btn">Save student</button>
        </form>
      </div>

      <div className="panel">
        <h3>Student roster</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Roll no</th>
                <th>Student</th>
                <th>Department</th>
                <th>Section</th>
              </tr>
            </thead>
            <tbody>
              {data.students.map((student) => (
                <tr key={student.id}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>{student.dept}</td>
                  <td>{student.section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderCourses = () => (
    <div className="content-section two-column">
      <div className="panel">
        <h3>Create course</h3>
        <form className="stack-form" onSubmit={addCourse}>
          <input value={courseForm.code} onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })} placeholder="Course code" />
          <input value={courseForm.name} onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })} placeholder="Course name" />
          <div className="inline-fields">
            <select value={courseForm.dept} onChange={(e) => setCourseForm({ ...courseForm, dept: e.target.value })}>
              <option value="AIML">AIML</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
            </select>
            <select value={courseForm.facultyId} onChange={(e) => setCourseForm({ ...courseForm, facultyId: e.target.value })}>
              {data.faculty.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
              ))}
            </select>
          </div>
          <div className="inline-fields">
            <input type="number" value={courseForm.credit} min="1" max="6" onChange={(e) => setCourseForm({ ...courseForm, credit: e.target.value })} placeholder="Credits" />
            <input type="number" value={courseForm.minAttendance} min="40" max="100" onChange={(e) => setCourseForm({ ...courseForm, minAttendance: e.target.value })} placeholder="Min %" />
          </div>
          <button type="submit" className="primary-btn">Add course</button>
        </form>
      </div>

      <div className="panel">
        <h3>Courses and averages</h3>
        <div className="course-list">
          {courseReports.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-head">
                <div>
                  <strong>{course.code}</strong>
                  <small>{course.name}</small>
                </div>
                <span>{course.average}%</span>
              </div>
              <div className="meta-row">
                <span>{course.enrolledStudents.length} students</span>
                <span>{course.sessionCount} sessions</span>
                <span>{course.belowMinCount} low</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSessions = () => (
    <div className="content-section two-column">
      <div className="panel">
        <h3>Create class session</h3>
        <form className="stack-form" onSubmit={addSession}>
          <select value={sessionForm.courseId} onChange={(e) => setSessionForm({ ...sessionForm, courseId: e.target.value })}>
            {data.courses.map((course) => (
              <option key={course.id} value={course.id}>{course.code}</option>
            ))}
          </select>
          <div className="inline-fields">
            <input type="date" value={sessionForm.date} onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })} />
            <input type="number" min="1" max="8" value={sessionForm.period} onChange={(e) => setSessionForm({ ...sessionForm, period: e.target.value })} />
          </div>
          <input value={sessionForm.topic} onChange={(e) => setSessionForm({ ...sessionForm, topic: e.target.value })} placeholder="Session topic" />
          <button type="submit" className="primary-btn">Add session</button>
        </form>
      </div>

      <div className="panel">
        <h3>Class schedule</h3>
        <div className="session-list">
          {data.sessions.map((session) => {
            const course = data.courses.find((item) => item.id === session.courseId)
            return (
              <div key={session.id} className="session-item">
                <div>
                  <strong>{course?.code}</strong>
                  <small>{session.topic}</small>
                </div>
                <span>{session.date} • Period {session.period}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderLeaves = () => (
    <div className="content-section two-column">
      <div className="panel">
        <h3>Submit leave request</h3>
        <form className="stack-form" onSubmit={addLeaveRequest}>
          <select value={leaveForm.studentId} onChange={(e) => setLeaveForm({ ...leaveForm, studentId: e.target.value })}>
            {data.students.map((student) => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
          <div className="inline-fields">
            <input type="date" value={leaveForm.fromDate} onChange={(e) => setLeaveForm({ ...leaveForm, fromDate: e.target.value })} />
            <input type="date" value={leaveForm.toDate} onChange={(e) => setLeaveForm({ ...leaveForm, toDate: e.target.value })} />
          </div>
          <input value={leaveForm.reason} onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })} placeholder="Reason for leave" />
          <button type="submit" className="primary-btn">Submit request</button>
        </form>
      </div>

      <div className="panel">
        <h3>Leave approvals</h3>
        <div className="leave-list">
          {data.leaveRequests.map((request) => {
            const student = data.students.find((item) => item.id === request.studentId)
            return (
              <div key={request.id} className="leave-item">
                <div>
                  <strong>{student?.name}</strong>
                  <small>{request.reason}</small>
                </div>
                <div className="leave-actions">
                  <span className={`badge ${request.approvalStatus.toLowerCase()}`}>{request.approvalStatus}</span>
                  {request.approvalStatus !== 'Approved' && (
                    <button type="button" className="small-btn" onClick={() => approveLeave(request.id)}>Approve</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderReports = () => (
    <div className="content-section">
      <div className="panel">
        <h3>Student-wise attendance report</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Attendance</th>
                <th>Minimum</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.students.flatMap((student) => data.courses.map((course) => {
                const pct = getStudentAttendanceForCourse(student.id, course.id)
                const courseHasEnrollment = data.enrollments.some((entry) => entry.studentId === student.id && entry.courseId === course.id)
                if (!courseHasEnrollment) return null

                return (
                  <tr key={`${student.id}-${course.id}`}>
                    <td>{student.name}</td>
                    <td>{course.code}</td>
                    <td>{pct}%</td>
                    <td>{course.minAttendance}%</td>
                    <td>{pct < course.minAttendance ? 'Below minimum' : 'On track'}</td>
                  </tr>
                )
              })).filter(Boolean)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'students', label: 'Students' },
    { key: 'courses', label: 'Courses' },
    { key: 'sessions', label: 'Sessions' },
    { key: 'attendance', label: 'Attendance' },
    { key: 'leaves', label: 'Leaves' },
    { key: 'reports', label: 'Reports' },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-box">
          <div className="brand-badge">S</div>
          <div>
            <strong>Attendance</strong>
            <small>DBMS prototype</small>
          </div>
        </div>

        <nav className="nav">
          {tabs.map((tab) => (
            <button key={tab.key} type="button" className={activeTab === tab.key ? 'nav-btn active' : 'nav-btn'} onClick={() => setActiveTab(tab.key)}>
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-panel">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'courses' && renderCourses()}
        {activeTab === 'sessions' && renderSessions()}
        {activeTab === 'attendance' && (
          <AttendanceTab
            data={data}
            attendanceForm={attendanceForm}
            setAttendanceForm={setAttendanceForm}
            markAttendanceForSession={markAttendanceForSession}
            sessionOptions={sessionOptions}
            statusOptions={statusOptions}
          />
        )}
        {activeTab === 'leaves' && renderLeaves()}
        {activeTab === 'reports' && renderReports()}
      </main>
    </div>
  )
}

function AttendanceTab({ data, attendanceForm, setAttendanceForm, markAttendanceForSession, sessionOptions, statusOptions }) {
  const selectedSession = data.sessions.find((session) => session.id === attendanceForm.sessionId)
  const selectedCourse = data.courses.find((course) => course.id === attendanceForm.courseId)
  const enrolledStudents = data.enrollments
    .filter((entry) => entry.courseId === attendanceForm.courseId)
    .map((entry) => data.students.find((student) => student.id === entry.studentId))
    .filter(Boolean)

  const [attendanceDraft, setAttendanceDraft] = useState({})

  const statusMap = enrolledStudents.reduce((acc, student) => {
    const current = attendanceDraft[student.id]
    const existing = data.attendance.find((entry) => entry.sessionId === attendanceForm.sessionId && entry.studentId === student.id)
    acc[student.id] = current ?? existing?.status ?? 'Present'
    return acc
  }, {})

  const updateStatus = (studentId, value) => {
    setAttendanceDraft((current) => ({ ...current, [studentId]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!attendanceForm.sessionId || !attendanceForm.courseId) return
    markAttendanceForSession(attendanceForm.sessionId, enrolledStudents.map((student) => student.id), statusMap)
  }

  return (
    <div className="content-section">
      <div className="panel">
        <h3>Mark attendance</h3>
        <form onSubmit={handleSubmit} className="attendance-form">
          <div className="inline-fields">
            <select value={attendanceForm.courseId} onChange={(e) => {
              const nextCourseId = e.target.value
              const nextSession = data.sessions.find((session) => session.courseId === nextCourseId)
              setAttendanceDraft({})
              setAttendanceForm({ courseId: nextCourseId, sessionId: nextSession ? nextSession.id : '' })
            }}>
              {data.courses.map((course) => (
                <option key={course.id} value={course.id}>{course.code}</option>
              ))}
            </select>

            <select value={attendanceForm.sessionId} onChange={(e) => {
              setAttendanceDraft({})
              setAttendanceForm({ ...attendanceForm, sessionId: e.target.value })
            }}>
              {sessionOptions.map((session) => (
                <option key={session.id} value={session.id}>{session.date} • P{session.period}</option>
              ))}
            </select>
          </div>

          {selectedCourse && selectedSession ? (
            <div className="attendance-table-wrap">
              <div className="session-header">
                <strong>{selectedCourse.code}</strong>
                <span>{selectedSession.topic}</span>
              </div>
              <div className="attendance-list">
                {enrolledStudents.map((student) => (
                  <div key={student.id} className="attendance-row">
                    <div>
                      <strong>{student.name}</strong>
                      <small>{student.rollNo}</small>
                    </div>
                    <select value={statusMap[student.id] ?? 'Present'} onChange={(e) => updateStatus(student.id, e.target.value)}>
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <button type="submit" className="primary-btn">Save attendance</button>
            </div>
          ) : <p className="empty-state">Create a session to start marking attendance.</p>}
        </form>
      </div>
    </div>
  )
}

export default App
