import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from '@material-ui/core';

export default function FAQ() {
  return (
    <Container>
      <Accordion style={{ borderRadius: 10, margin: 10 }} variant="outlined">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography variant="body1" color="primary">
            How much does the CRM software cost?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our CRM software is completely free to use. There are no hidden fees
            or charges.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ borderRadius: 10, margin: 10 }} variant="outlined">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
          <Typography variant="body1" color="primary">
            Is the CRM customizable to suit our business needs?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Absolutely! Our CRM comes with extensive customization options,
            allowing you to tailor it to your specific business requirements,
            branding, and workflows.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ borderRadius: 10, margin: 10 }} variant="outlined">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header">
          <Typography variant="body1" color="primary">
            What kind of customer support do you offer?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We provide email customer support to assist you with any queries or
            technical issues. You can reach us at crm@gmail.com.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ borderRadius: 10, margin: 10 }} variant="outlined">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header">
          <Typography variant="body1" color="primary">
            Is the data stored in the CRM secure?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, we prioritize the security of your data. Our CRM employs robust
            encryption and follows best practices to ensure your information is
            safe and protected. Regular backups are also taken to prevent data
            loss.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
