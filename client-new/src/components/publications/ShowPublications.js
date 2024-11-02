
import React from 'react';
import GridContainer from '../forms/fields/GridContainer';
import TableComponent from '../forms/table/TableComponent';
import { formatDate } from '../../utils/timeParse';

const ShowPublications = ({ formData }) => {
    return (<>
    {formData && (
                    <>
                    {formData.sci && formData.sci.length>0 && (<>
                        <GridContainer elements={[
                       <h2>SCI/SCIE/SSCI/ABCD/AHCI Journal</h2>
                        ]} space={1}/>
                          <GridContainer elements={[
                                <TableComponent data={formData.sci} keys={['authors','year','title','name','impact_factor','doi_link','id']}  titles={['Author(s)','Year of Publication',`Title of Paper`,'Name of the Journal','Impact Factor','DOI','Actions'] 
                                 }
                                 components={[
                                    {key: 'doi_link', component: ({ data }) => <a href={data} target="_blank" rel="noopener noreferrer">link</a>},
                                    {key: 'year', component: ({ data }) => <span>{formatDate(data)}</span>},
                                    {key: 'id', component: ({ data }) => <><a href={`/publications/sci/${data}`}><i class="fa fa-pencil"></i></a><a href={`/publications/sci/${data}`}><i class="fa fa-trash-o"></i></a></> },
                                 ]}
                                 />,
                            ]}
                            space={3}
                            />
                    </>)}


                    {formData.non_sci && formData.non_sci.length>0 && (<>
                        <GridContainer elements={[
                       <h2>Papers in Scopus Journal</h2>
                        ]} space={1}/>
                          <GridContainer elements={[
                                <TableComponent data={formData.non_sci} keys={['authors','year','title','name','impact_factor','doi_link']}  titles={['Author(s)','Year of Publication',`Title of Paper`,'Name of the Journal','Impact Factor','DOI'] 
                                 }
                                 components={[
                                    {key: 'doi_link', component: ({ data }) => <a href={data} target="_blank" rel="noopener noreferrer">link</a>},
                                    {key: 'year', component: ({ data }) => <span>{formatDate(data)}</span>},
                                 ]}
                                 />,
                            ]}
                            space={3}
                            />
                    </>)}
                    {formData.national && formData.national.length>0 && (<>
                        <GridContainer elements={[
                       <h2>Papers in International Conferences</h2>
                        ]} space={2}/>
                          <GridContainer elements={[
                                <TableComponent data={formData.international} keys={['authors','year','title','name','country','doi_link']}  titles={['Author(s)','Year of Publication',`Title of Paper`,'Name of Conference','Place of Conference','DOI'] 
                                 }
                                 components={[
                                    {key: 'doi_link', component: ({ data }) => <a href={data} target="_blank" rel="noopener noreferrer">link</a>},
                                    {key: 'year', component: ({ data }) => <span>{formatDate(data)}</span>},
                                    {key: 'country', component: ({ data }) => <span>{data}</span>},
                                 ]}
                                 />,
                            ]}
                            space={3}
                            />
                    </>)}

                    {formData.national && formData.national.length>0 && (<>
                        <GridContainer elements={[
                       <h2>Papers in National Conferences</h2>
                        ]} space={1}/>
                          <GridContainer elements={[
                                <TableComponent data={formData.national} keys={['authors','year','title','name','city','doi_link']}  titles={['Author(s)','Year of Publication',`Title of Paper`,'Name of Conference','Place of Conference','DOI'] 
                                 }
                                 components={[
                                    {key: 'doi_link', component: ({ data }) => <a href={data} target="_blank" rel="noopener noreferrer">link</a>},
                                    {key: 'year', component: ({ data }) => <span>{formatDate(data)}</span>},
                                 ]}
                                 />,
                            ]}
                            space={3}
                            />
                    </>)}


                    {formData.book && formData.book.length>0 && (<>
                        <GridContainer elements={[
                       <h2>Book/Book Chapters</h2>
                        ]} space={1}/>
                          <GridContainer elements={[
                                <TableComponent data={formData.book} keys={['name','title','year','publisher_name']}  titles={['Name of Book',`Title of Paper`,'Year of Publication','Name of Publisher'] 
                                 }
                                 components={[
                                    {key: 'year', component: ({ data }) => <span>{formatDate(data)}</span>},
                                 ]}
                                 />,
                            ]}
                            space={3}
                            />
                    </>)}


                    {formData.patents && formData.patents.length>0 && (<>
                        <GridContainer elements={[
                       <h2>Patents</h2>
                        ]} space={1}/>
                         <GridContainer elements={[
                                <TableComponent data={formData.national} keys={['authors','year','status','title','country']}  titles={['Author(s)','Year of Award',`Status`,'Title of Patent','International/National'] 
                                 }
                                 components={[
                                    {key: 'doi_link', component: ({ data }) => <a href={data} target="_blank" rel="noopener noreferrer">link</a>},
                                    {key: 'year', component: ({ data }) => <span>{formatDate(data)}</span>},
                                 ]}
                                 />,
                            ]}
                            space={3}
                            />
                    </>)}

                    </>
                )}
    </>)
};
export default ShowPublications;