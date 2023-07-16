// import React, { useState } from 'react';
// import Typography from '@material-ui/core/Typography';

// const ReadMoreText = ({ text, maxCharCount }) => {
//   const [expanded, setExpanded] = useState(false);

//   const toggleExpanded = () => {
//     setExpanded(!expanded);
//   };

//   const displayText = expanded ? text : `${text.slice(0, maxCharCount)}...`;

//   return (
//     <Typography variant="body1">
//       {displayText}
//       {!expanded && (
//         <span
//           style={{ color: 'blue', cursor: 'pointer' }}
//           onClick={toggleExpanded}>
//           Read more
//         </span>
//       )}
//     </Typography>
//   );
// };

// export default ReadMoreText;

// //////////////////////////// //////////////////////////// //////////////////////////

// import React, { useState } from 'react';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
// import Collapse from '@material-ui/core/Collapse';

// const ReadMoreText = ({ label, text, maxCharCount, ...otherProps }) => {
//   const [expanded, setExpanded] = useState(false);

//   const toggleExpanded = () => {
//     setExpanded(!expanded);
//   };

//   const displayText = expanded ? text : `${text.slice(0, maxCharCount)}...`;

//   return (
//     <TextField
//       label={label}
//       multiline
//       minRows={4}
//       value={displayText}
//       onClick={toggleExpanded}
//       InputProps={{
//         readOnly: true,
//       }}
//       {...otherProps}
//       // maxRows={6}
//       // placeholder="Note"
//       // value={note.noteContent}
//       // variant="filled"
//       // fullWidth
//       // disabled={true}
//       // label={note.noteDate}
//     />
//   );
// };

// export default ReadMoreText;

///////////////////////////////////////////////

import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

const ReadMoreText = ({ text, maxCharCount }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const displayText = expanded ? text : `${text.slice(0, maxCharCount)}...`;

  return (
    <div>
      <Typography variant="body1">
        <Collapse in={expanded} collapsedHeight={50}>
          {text}
        </Collapse>
        <Collapse in={!expanded}>
          <Typography variant="body1">
            {displayText}
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={toggleExpanded}>
              {expanded ? 'Read less' : 'Read more'}
            </span>
          </Typography>
        </Collapse>
      </Typography>
    </div>
  );
};

export default ReadMoreText;
