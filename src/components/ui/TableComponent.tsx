  import { Table } from "@radix-ui/themes";
  import { Link } from "react-router-dom";  
  import { ChevronDownIcon } from "@heroicons/react/24/outline";
  import React, { useState } from "react";
  import { type Patient, type Status, PATIENT_STATUS } from "../../types/patients";

  interface TableComponentProps {
      title?: string;
      buttonText?: string;
      buttonRoute?: string;
      headers: string[];
      data: Patient[];
      limit: number;
  }

  const statusStyles: Record<Status, string> = {
    ACTIVE: 'bg-green-active/30 text-green-active',
    PENDING: 'bg-yellow-warning/30 text-yellow-warning',
    REVIEW: 'bg-yellow-warning/30 text-yellow-warning'
  };

  export default function TableComponent({
    title,
    buttonText,
    buttonRoute,
    headers,
    data,
    limit
  }: TableComponentProps) {
      const [expandedRow, setExpandedRow] = useState<number | null>(null);

      const toggleRow = (index: number) => {
        setExpandedRow(expandedRow === index ? null : index);
      };

      const displayedData = limit ? data.slice(0, limit) : data; 

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
                        <div className="text-gray-primary font-medium uppercase tracking-wider py-4 px-6 text-xs text-center">
                          {header}
                        </div>
                      </Table.ColumnHeaderCell>
                    ))}
                    <Table.ColumnHeaderCell className="w-10"></Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
              {displayedData.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* Fila Principal */}
                <Table.Row 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleRow(index)}
                >
                  <Table.Cell className="p-0 text-center">
                    <div className="font-medium text-black-primary py-4 px-6">
                      {item.firstName} {item.lastName}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="p-0 text-center">
                    <div className="text-gray-primary py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[item.status]} tracking-wide uppercase`}>
                        {PATIENT_STATUS[item.status]}
                      </span>
                    </div>
                  </Table.Cell>
                  
                  {/* ULTIMA ACCIÓN (Mapeado a motivo por ahora) */}
                  <Table.Cell className="p-0 text-center">
                    <div className="font-medium text-black-primary py-4 px-6">
                      {item.consultationReason.length > 20 
                      ? `${item.consultationReason.substring(0, 20)}...` 
                      : item.consultationReason}
                    </div>
                  </Table.Cell>

                  {/* FECHA (Usando birthDate como placeholder) */}
                  <Table.Cell className="p-0 text-center">
                    <div className="lining-nums py-4 px-6">
                      {item.birthDate}
                    </div>
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
                  <Table.Row className="bg-primary-10/20">
                    <Table.Cell colSpan={headers.length + 1} className="p-6">
                      <div className="text-sm text-gray-600 animate-in fade-in slide-in-from-top-1">
                        <p className="mb-1"><strong>Ocupación:</strong> {item.occupation}</p>
                        <p><strong>Motivo completo:</strong> {item.consultationReason}</p>
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