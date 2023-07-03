import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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
  console.log("selectedEntries in PDF : "+ JSON.stringify(selectedEntries))
  console.log("selectedEvent in PDF : "+ selectedEvent)
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{selectedEvent}</Text>
        {selectedEntries.map((singleEntry, i) => (
          <>
         { console.log("singleEntry in PDF :" + singleEntry)}
          <View key={`${singleEntry.entryId}-${i}`} style={styles.entry}>
            <Text style={styles.entryText}>{singleEntry.personName}</Text>
            <Text>{singleEntry.city}</Text>
            <Text>₹{singleEntry.amount}</Text>
            <Text>{singleEntry.gift}</Text>
          </View>
          </>
        ))}
      </Page>
    </Document>
  );
};
