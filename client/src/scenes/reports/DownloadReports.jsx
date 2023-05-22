import React, { useState } from "react";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  entry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#000000",
    paddingBottom: 15,
    marginBottom: 15,
  },
  entryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const DownloadsPdf = ({ reportsArray, date }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{`Reports - ${date}`}</Text>
        {reportsArray.map((singleReport, i) => (
          <View key={`${singleReport.entryId}-${i}`} style={styles.entry}>
            <Text style={styles.entryText}>{singleReport.time}</Text>
            <Text>{singleReport.slots.machine_id}</Text>
            <Text>{singleReport.slots.job_id}</Text>
            <Text>{singleReport.slots.completed_count}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

const DownloadReports = ({ reportsArray, date}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
  };

  return (
    <div>
      <PDFDownloadLink
        document={<DownloadsPdf reportsArray={reportsArray} date={date}/>}
        fileName={`Reports - ${date}.pdf`}
      >
        {/* {({ blob, url, loading, error }) => */}
          {!loading ? "Generating PDF..." : "Ready to Download PDF"}
        {/* } */}
      </PDFDownloadLink>
      <button onClick={handleDownload} disabled={loading}>
        Download
      </button>
    </div>
  );
};

export default DownloadReports;
