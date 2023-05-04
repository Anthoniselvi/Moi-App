
import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export const handleDownload = ({selectedEntries, selectedEvent}) => {
    const styles = StyleSheet.create({
      page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 30
      },
      header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
      },
      entryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 4,
        borderBottomColor: '#0073b1',
        paddingBottom: 15,
        paddingTop: 15
      },
      name: {
        color: '#41b6e6',
        fontWeight: 'bold'
      },
      city: {
        color: '#000'
      },
      amount: {
        color: '#41b6e6',
        fontWeight: 'bold'
      },
      gift: {
        color: '#41b6e6',
        fontWeight: 'bold'
      }
    });
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.header}>{selectedEvent.name}</Text>
          {selectedEntries.map((singleEntry, i) => (
            <View style={styles.entryContainer} key={`${singleEntry.entryId}-${i}`}>
              <View>
                <Text style={styles.name}>{singleEntry.personName}</Text>
                <Text style={styles.city}>{singleEntry.city}</Text>
              </View>
              <Text style={styles.amount}>₹{singleEntry.amount}</Text>
              <Text style={styles.gift}>{singleEntry.gift}</Text>
            </View>
          ))}
        </Page>
      </Document>
    );
  };
  