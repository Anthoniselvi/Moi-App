import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import Header from "components/Header";
// import { useGetEventsQuery } from "../../state/api";
import Header from "../../components/Header"

const Event = ({
  _id,
  eventType, name, place, date, profileId
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {name}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        {/* <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly /> */}

        <Typography variant="body2">{place}</Typography>
        <Typography variant="body2">{date}</Typography>
        
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>{eventType}</Typography>
          <Typography>
           {date}
          </Typography>
          {/* <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

const EventsList = () => {
  // const { data, isLoading } = useGetEventsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="EVENTS" subtitle="See your list of events." />
      {/* {data || !isLoading ? ( */}
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {/* {data.map(
            ({
                _id, eventType, name, place, date, profileId
            }) => (
              <Event
                key={_id}
                _id={_id}
                name={name}
                description={eventType}
                place={place}
                date={date}
               
              />
            )
          )} */}
        </Box>
      {/* ) : ( */}
        <>Loading...</>
      {/* )} */}
    </Box>
  );
};

export default EventsList;