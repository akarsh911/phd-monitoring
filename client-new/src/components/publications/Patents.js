import React, { useEffect, useState } from 'react';
import GridContainer from '../forms/fields/GridContainer';
import InputField from '../forms/fields/InputField';
import DropdownField from '../forms/fields/DropdownField';
import FileUploadField from '../forms/fields/FileUploadField';
import CustomButton from '../forms/fields/CustomButton';

const Patents = ({callback,updateValue}) => {
    const [body, setBody] = useState({});
    const year = new Date().getFullYear();
    const yearRange = Array.from({ length: 7 }, (_, i) => year - 3 + i);  
 
    useEffect(() => {
        updateValue(body);
    }, [body]);  

    const setBodyValue = (key,value) => {
        setBody((prev) => ({
            ...prev,
            [key]:value,}));
    }

    return (
        <>
            <GridContainer elements={[
                <InputField label={"Author(s)"} hint={"Enter Author(s)"} onChange={(value)=>{setBodyValue("authors",value)}} />,
            ]}/>
            <GridContainer elements={[
                <DropdownField label={"Year of Award"} options={yearRange.map((year)=>{return {title:year,value:year}})} onChange={(value)=>{setBodyValue("year",value)}}/>
            ]}/>
            <GridContainer elements={[
                <InputField label={"Title of the Patent"} hint={"Enter Title"} onChange={(value)=>{setBodyValue("title",value)}} />,
            ]} space={2}/>

            <GridContainer elements={[
                <DropdownField label={"Type of Patent"} options={[{title:"National",value:"National"},{title:"International",value:"International"}]} onChange={(value)=>{setBodyValue("country",value)}} />,
                ,<DropdownField label={"Status of Patent:"} options={[
                    {title:"Granted",value:"granted"},
                    {title:"Filed",value:"filed"},
                    {title:"Published",value:"published"},
                ]} onChange={(value)=>{setBodyValue("status",value)}} />,
            ]} />

<GridContainer elements={[
                <InputField label={"DOI Link"} hint={"DOI Link"} onChange={(value)=>{setBodyValue("doi_link",value)}} />,
            ]}/>

            <GridContainer elements={[
                <FileUploadField label={"Upload First Page"} onChange={(value)=>{setBodyValue("first_page",value)}} />,
            ]}/>

            
            <GridContainer elements={[
               <CustomButton text="Submit" onClick={()=>{callback(body)}}/>
            ]}/>
        </>
    );
};

export default Patents;