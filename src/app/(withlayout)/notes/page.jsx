"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ActionBarTable from "@/components/ActionBarTable/ActionBarTable";
import { Button, Input, Table, Dropdown, Menu, message } from "antd";
import { ReloadOutlined, ShareAltOutlined, ExportOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useDebounce } from "@/hook/useDebounce";
import { jsPDF } from "jspdf"
import { baseUrl } from '@/constants/baseUrl'

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchNotes = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/notes`,
        {
          params: {
            page: params.page || currentPage,
            limit: params.pageSize || pageSize,
            title: params.search || debouncedSearchTerm,
            sortBy: params.sortBy || sortBy,
            order: params.sortOrder || sortOrder,
          },
        }
      );
      setNotes(response.data);
      setTotal(response.headers["x-total-count"] || response.data.length * currentPage);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
    }
  },[currentPage,pageSize, debouncedSearchTerm, sortBy, sortOrder]);

 

 const handleExportPDF = (note) => {
    const doc = new jsPDF();
    doc.text(`Title: ${note.title}`, 10, 10);
    doc.text(`Note: ${note.note}`, 10, 20);
    doc.save(`note_${note.id}.pdf`);
  };

  const handleExportMarkdown = (note) => {
    const markdown = `# ${note.title}\n\n${note.note}`;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `note_${note.id}.md`;
    link.click();
  };

  const handleExportPlainText = (note) => {
    const text = `Title: ${note.title}\n\n${note.note}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `note_${note.id}.txt`;
    link.click();
  };


  const resetFilters = () => {
    setSearchTerm("");
    setSortBy(null);
    setSortOrder(null);
    fetchNotes({ search: "", sortBy: null, sortOrder: null });
  };

  const handlePaginationChange = (page, newPageSize) => {
    setCurrentPage(page);
    setPageSize(newPageSize);
    fetchNotes({ page, pageSize: newPageSize });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const { field, order } = sorter;
    const newSortOrder = order === "ascend" ? "asc" : order === "descend" ? "desc" : null;
    setSortBy(field || null);
    setSortOrder(newSortOrder);
    fetchNotes({ sortBy: field, sortOrder: newSortOrder });
  };

  useEffect(() => {
    fetchNotes();
  }, [currentPage, pageSize, debouncedSearchTerm, sortBy, sortOrder, fetchNotes]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text * 1000).toLocaleString(),
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              {/* <Menu.Item onClick={() => handleShare(record.id, "public")}>
                <ShareAltOutlined /> Public Link
              </Menu.Item>
              <Menu.Item onClick={() => handleShare(record.id, "private")}>
                <ShareAltOutlined /> Private Link
              </Menu.Item> */}
              <Menu.Divider />
              <Menu.Item onClick={() =>  handleExportPDF(record)}>
                <ExportOutlined /> Export to PDF
              </Menu.Item>
              <Menu.Item onClick={() => handleExportMarkdown(record)}>
                <ExportOutlined /> Export to Markdown
              </Menu.Item>
              <Menu.Item onClick={() => handleExportPlainText(record)}>
                <ExportOutlined /> Export to Text
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button>Actions</Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <ActionBarTable title="Notes List">
        <Input
          size="large"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "20%" }}
        />
        <div>
          <Link href="/notes/create">
            <Button type="primary">Create Notes</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button style={{ margin: "0 5px" }} type="primary" onClick={resetFilters}>
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBarTable>
      <Table
        columns={columns}
        dataSource={notes}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize,
          total,
          showSizeChanger: true,
          onChange: handlePaginationChange,
          onShowSizeChange: handlePaginationChange,
        }}
        onChange={handleTableChange}
        scroll={{
            x: "max-content", 
          }}
          style={{
            overflowX: "auto", 
          }}
      />
    </div>
  );
};

export default NotesPage;
