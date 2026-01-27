// import { useEffect, useMemo, useRef, useState } from "react";
// import { fetchActivities } from "../api/activities.api.js";

// export default function Activities() {
//   const [activities, setActivities] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const limit = 20;

//   useEffect(() => {
//     fetchActivities(page, limit).then(res => {
//       setActivities(res.data);
//       setTotal(res.meta.total);
//     });
//   }, [page]);

//   const totalPages = Math.ceil(total / limit);

//   return (
//     <div className="dashboard">
//       {/* Header */}
//       <div className="dashboard-header">
//         <h2>Activities</h2>
//         <p className="dashboard-subtitle">
//           View and manage all learning activities
//         </p>
//       </div>

//       {/* Activities Card */}
//       <div className="dashboard-card">
//         {/* Header row */}
//         <div className="activities-header">
//           <span className="activities-col-title">Title</span>
//           <span className="activities-col-type">Type</span>
//           <span className="activities-col-participants">Participants</span>
//         </div>

//         {/* Rows */}
//         <ul className="activities-list">
//           {activities.map(activity => (
//             <li key={activity.id} className="activities-row">
//               <span className="activities-col-title">
//                 {activity.title}
//               </span>

//               <span className="activities-col-type">
//                 <span className={`activity-type ${activity.type}`}>
//                   {activity.type}
//                 </span>
//               </span>

//               <span className="activities-col-participants">
//                 <span className="participants-icon">👤</span>
//                 {activity.participants}
//               </span>
//             </li>
//           ))}
//         </ul>

//         {/* Pagination */}
//         <div className="users-pagination">
//           <button
//             className="nav-btn"
//             disabled={page === 1}
//             onClick={() => setPage(p => p - 1)}
//           >
//             Prev
//           </button>

//           <span className="pagination-text">
//             Page {page} of {totalPages}
//           </span>

//           <button
//             className="nav-btn"
//             disabled={page >= totalPages}
//             onClick={() => setPage(p => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// // Fixed code with console log
// import { useEffect, useMemo, useRef, useState } from "react";
// import { fetchActivities } from "../api/activities.api.js";

// export default function Activities() {
//   const [activities, setActivities] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const limit = 20;
//   const [scrollTop, setScrollTop] = useState(0);

//   useEffect(() => {
//     fetchActivities(page, limit).then(res => {
//       setActivities(res.data);
//       setTotal(res.meta.total);
//     });
//   }, [page]);

//   const totalPages = Math.ceil(total / limit);

//   // Fixed code
//   const ROW_HEIGHT = 56;
//   const VIEWPORT_HEIGHT = 320;
//   const OVERSCAN = 5;
//   const containerRef = useRef(null);
//   const startIndex = Math.max(
//     0,
//     Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN
//   );

//   const visibleCount =
//     Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT) + OVERSCAN * 2;

//   const endIndex = Math.min(
//     activities.length,
//     startIndex + visibleCount
//   );

//   const visibleActivities = useMemo(() => {
//     console.log(
//       "[Activities] computing window",
//       { startIndex, endIndex }
//     );
//     return activities.slice(startIndex, endIndex);
//   }, [activities, startIndex, endIndex]);

//   console.log("[Activities] render");
//   console.log("[Activities] total items:", activities.length);
//   console.log("[Activities] visible items:", visibleActivities.length);

//   return (
//     <div className="dashboard">
//       {/* Header */}
//       <div className="dashboard-header">
//         <h2>Activities</h2>
//         <p className="dashboard-subtitle">
//           View and manage all learning activities
//         </p>
//       </div>

//       {/* Activities Card */}
//       <div className="dashboard-card">
//         {/* Header row */}
//         <div className="activities-header">
//           <span className="activities-col-title">Title</span>
//           <span className="activities-col-type">Type</span>
//           <span className="activities-col-participants">Participants</span>
//         </div>

//         {/* Scroll container */}
//         <div
//           ref={containerRef}
//           style={{
//             height: VIEWPORT_HEIGHT,
//             overflowY: "auto",
//             position: "relative"
//           }}
//           onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
//         >
//           {/* Fake full height */}
//           <div
//             style={{
//               height: activities.length * ROW_HEIGHT,
//               position: "relative"
//             }}
//           >
//             {visibleActivities.map((activity, i) => {
//               const index = startIndex + i;

//               console.log("[Activities] rendering row index:", index);

//               return (
//                 <div
//                   key={activity.id}
//                   className="activities-row"
//                   style={{
//                     position: "absolute",
//                     top: index * ROW_HEIGHT,
//                     height: ROW_HEIGHT,
//                     width: "100%"
//                   }}
//                 >
//                   <span className="activities-col-title">
//                     {activity.title}
//                   </span>

//                   <span className="activities-col-type">
//                     <span className={`activity-type ${activity.type}`}>
//                       {activity.type}
//                     </span>
//                   </span>

//                   <span className="activities-col-participants">
//                     <span className="participants-icon">👤</span>
//                     {activity.participants}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="users-pagination">
//           <button
//             className="nav-btn"
//             disabled={page === 1}
//             onClick={() => setPage(p => p - 1)}
//           >
//             Prev
//           </button>

//           <span className="pagination-text">
//             Page {page} of {totalPages}
//           </span>

//           <button
//             className="nav-btn"
//             disabled={page >= totalPages}
//             onClick={() => setPage(p => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// Fixed code without console log
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchActivities } from "../api/activities.api.js";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    fetchActivities(page, limit).then(res => {
      setActivities(res.data);
      setTotal(res.meta.total);
    });
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  // Fixed code
  const ROW_HEIGHT = 56;
  const VIEWPORT_HEIGHT = 320;
  const OVERSCAN = 5;
  const containerRef = useRef(null);
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN
  );

  const visibleCount =
    Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT) + OVERSCAN * 2;

  const endIndex = Math.min(
    activities.length,
    startIndex + visibleCount
  );

  const visibleActivities = useMemo(() => {
    return activities.slice(startIndex, endIndex);
  }, [activities, startIndex, endIndex]);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Activities</h2>
        <p className="dashboard-subtitle">
          View and manage all learning activities
        </p>
      </div>

      {/* Activities Card */}
      <div className="dashboard-card">
        {/* Header row */}
        <div className="activities-header">
          <span className="activities-col-title">Title</span>
          <span className="activities-col-type">Type</span>
          <span className="activities-col-participants">Participants</span>
        </div>

        {/* Scroll container */}
        <div
          ref={containerRef}
          style={{
            height: VIEWPORT_HEIGHT,
            overflowY: "auto",
            position: "relative"
          }}
          onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
        >
          {/* Fake full height */}
          <div
            style={{
              height: activities.length * ROW_HEIGHT,
              position: "relative"
            }}
          >
            {visibleActivities.map((activity, i) => {
              const index = startIndex + i;

              console.log("[Activities] rendering row index:", index);

              return (
                <div
                  key={activity.id}
                  className="activities-row"
                  style={{
                    position: "absolute",
                    top: index * ROW_HEIGHT,
                    height: ROW_HEIGHT,
                    width: "100%"
                  }}
                >
                  <span className="activities-col-title">
                    {activity.title}
                  </span>

                  <span className="activities-col-type">
                    <span className={`activity-type ${activity.type}`}>
                      {activity.type}
                    </span>
                  </span>

                  <span className="activities-col-participants">
                    <span className="participants-icon">👤</span>
                    {activity.participants}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="users-pagination">
          <button
            className="nav-btn"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Prev
          </button>

          <span className="pagination-text">
            Page {page} of {totalPages}
          </span>

          <button
            className="nav-btn"
            disabled={page >= totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
