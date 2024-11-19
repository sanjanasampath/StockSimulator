import React from "react";
import { classNames } from "../utils/ui";

function Table({ children, ...props }) {
  return (
    <table {...props} className="w-full text-sm text-left text-brand">
      {children}
    </table>
  );
}

function TableHead({ children, ...props }) {
  return (
    <thead {...props} className="text-xs text-brand bg-navBackground">
      {children}
    </thead>
  );
}

function TableBody({ children, ...props }) {
  return (
    <tbody {...props} className="divide-y divide-border-gray-700">
      {children}
    </tbody>
  );
}

function TableRow({ children, ...props }) {
  return (
    <tr {...props} className="border-b border-gray-700">
      {children}
    </tr>
  );
}

function TableCell({ children, condition, ...props }) {
  const classNames = `py-3 px-6 ${condition || ""}`;
  return (
    <td {...props} className={classNames}>
      {children}
    </td>
  );
}

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
