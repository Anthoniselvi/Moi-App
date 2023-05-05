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

export const EntriesPdf = ({ selectedEntries, selectedEvent }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{selectedEvent.name}</Text>
        {selectedEntries.map((singleEntry, i) => (
          <View key={`${singleEntry.entryId}-${i}`} style={styles.entry}>
            <Text style={styles.entryText}>{singleEntry.personName}</Text>
            <Text>{singleEntry.city}</Text>
            <Text>₹{singleEntry.amount}</Text>
            <Text>{singleEntry.gift}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

const DownloadEntries = ({ selectedEntries, selectedEvent }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
  };

  return (
    <div>
      <PDFDownloadLink
        document={<EntriesPdf selectedEntries={selectedEntries} selectedEvent={selectedEvent} />}
        fileName={`${selectedEvent.name}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Generating PDF..." : "Download PDF"
        }
      </PDFDownloadLink>
      {/* <button onClick={handleDownload} disabled={loading}>
        Download
      </button> */}
    </div>
  );
};

export default DownloadEntries;
