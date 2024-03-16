import React, { useState, useCallback } from 'react';
import { Importer, ImporterField } from 'react-csv-importer';
import { AddPasswordsViaCSV } from './actions';
import { useToast } from "@/components/ui/use-toast";
import 'react-csv-importer/dist/index.css';

export default function CSVImportComponent ({ updatePasswords }) {
  const [csvData, setCsvData] = useState([]);

  const { toast } = useToast();

  const processChunk = useCallback((rows) => {
    // Accumulate the parsed rows
    setCsvData(currentData => [...currentData, ...rows]);
  }, []);

  const handleComplete = useCallback( async () => {
    // Once parsing is complete, send the accumulated data to the server
    console.log( csvData );
    let passwords = await AddPasswordsViaCSV( csvData );
    updatePasswords( passwords );
    toast({
      className: 'bg-blue-500 text-white',
      title: 'Passwords imported and saved successfully!',
      duration: 4500
  });
  }, [csvData]);


  return (
    <div>
      <h1>Upload and Parse CSV File</h1>
      <Importer processChunk={processChunk} onComplete={handleComplete}>
        <ImporterField name="username" label="Username" />
        <ImporterField name="password" label="Password" />
        <ImporterField name="websiteName" label="title" />
        <ImporterField name="websiteUrl" label="url" />
      </Importer>
    </div>
  );
};
