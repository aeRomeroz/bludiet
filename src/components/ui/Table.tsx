  import { Table } from "@radix-ui/themes";
  import { Link } from "react-router-dom";  
  import { ChevronDownIcon } from "@heroicons/react/24/outline";
  import React, { useState } from "react";

  interface TableComponentProps {
      title?: string;
      buttonText?: string;
      buttonRoute?: string;
      headers: string[];
      data: any[];
  }

  export default function TableComponent({
    title,
    buttonText,
    buttonRoute,
    headers,
    data
  }: TableComponentProps) {
      const [expandedRow, setExpandedRow] = useState<number | null>(null);

      const toggleRow = (index: number) => {
        setExpandedRow(expandedRow === index ? null : index);
      };

      return (
        <div className="bg-white border-[0.5px] border-primary-30 rounded-lg overflow-hidden w-full">
          {/*HEADER */}
          {(title || buttonText) && (
            <div className="flex justify-between items-center p-6 border-b-[0.5px] border-primary-30">
              {title && <h3 className="text-xl font-serif font-bold text-black-primary">{title}</h3>}
              {buttonText && buttonRoute && (
                <Link 
                  to={buttonRoute} 
                  className="text-sm font-sans underline text-blue-brand hover:underline"
                >
                  {buttonText}
                </Link>
              )}
            </div>
          )}

          <Table.Root variant="ghost" className="w-full">
            {/**/}
            <Table.Header>
                <Table.Row className="bg-gray-secondary/30">
                    {headers.map((header, index) => (
                      <Table.ColumnHeaderCell key={index} className="p-0">
                        <div className="text-gray-primary font-medium uppercase tracking-wider py-4 px-6 text-center">
                          {header}
                        </div>
                      </Table.ColumnHeaderCell>
                    ))}
                    <Table.ColumnHeaderCell className="w-10"></Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
              {data.map((item, index) => (
              <React.Fragment key={index}>
                {/* Fila Principal */}
                <Table.Row 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleRow(index)}
                >
                  <Table.Cell className="p-0 text-center">
                    <div className="font-medium text-black-primary py-4 px-6">{item.name}</div>
                  </Table.Cell>
                  <Table.Cell className="p-0 text-center">
                    <div className="text-gray-primary py-4 px-6">{item.state}</div>
                  </Table.Cell>
                  <Table.Cell className="p-0 text-center">
                    <div className="font-medium text-black-primary py-4 px-6">{item.last_action}</div>
                  </Table.Cell>
                  <Table.Cell className="p-0 text-center">
                    <div className="lining-nums py-4 px-6">{item.date}</div>
                  </Table.Cell>
                  {/*Flechita de acción*/}
                  <Table.Cell className="p-0">
                    <div className="py-4 px-6 flex justify-center items-center">
                      <ChevronDownIcon 
                        className={`h-5 w-5 text-gray-primary transition-transform duration-200 ${expandedRow === index ? 'rotate-180' : ''}`} 
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>

                {/* Fila Desplegable (Detalles) */}
                {expandedRow === index && (
                  <Table.Row className="bg-primary/30">
                    <Table.Cell colSpan={headers.length + 1}>
                      <div className="p-4 text-sm text-gray-600 animate-in fade-in slide-in-from-top-1">
                        {/* Aquí puedes poner lo que quieras: notas, peso, última cita... */}
                        <p><strong>Notas del paciente:</strong> {item.notas || 'Sin observaciones adicionales.'}</p>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </React.Fragment>
            ))}
            </Table.Body>

          </Table.Root>
        </div>
      )
  }