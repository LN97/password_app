import React, { useState, useCallback } from 'react';
import { Importer, ImporterField } from 'react-csv-importer';
import { AddPasswordsViaCSV } from './actions';
import { useToast } from "@/components/ui/use-toast";
import Slideover from "@/components/tailwind/slideOver";
import 'react-csv-importer/dist/index.css';
import { Button } from '@/components/ui/button';


export default function CSVImportComponent ({ updatePasswords }) {
  const [csvData, setCsvData] = useState([]);
  const [sliderState, updateSlider ] = useState( false );

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
  updateSlider( false );
  }, [csvData]);


  return (
    <>     
       <Button className="ml-3" onClick={ ( ) => updateSlider( !sliderState )}> 
          upload
       </Button>
    
       <Slideover state={ sliderState } action={ updateSlider }>
        <Importer processChunk={processChunk} onComplete={handleComplete}>
          <ImporterField name="username" label="Username" />
          <ImporterField name="password" label="Password" />
          <ImporterField name="websiteName" label="title" />
          <ImporterField name="websiteUrl" label="url" />
        </Importer>    
       </Slideover>
    </>
  );
};
