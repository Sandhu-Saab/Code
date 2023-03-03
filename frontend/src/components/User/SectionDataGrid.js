import React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link, ListItemButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from "@mui/icons-material/Visibility";

import "../../layouts/preloader3.css";
import ConfirmModal from "../../layouts/ConfirmModal";

function SectionDataGrid() {
	const [sections, setSections] = useState([]);

	const [loading, setLoading] = useState(true);

	const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
	const [selectedRowId, setSelectedRowId] = React.useState(null);
	const [counter, setCounter] = useState(3);
	const [open, setOpen] = useState(true);

	let token = sessionStorage.getItem("access");



	/**
	 * Fetch all sections from the database and store it on Sections state.
	 */
	const getSections = async () => {
		try {
			const response = await axios({
				method: "GET",
				url: "/api/courses/",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await response.data;
			setSections(data);
		} catch (error) {
			if (error.response) {
				console.log(error.response);
				console.log(error.response.status);
				console.log(error.response.headers);
			}
		}
	}

	useEffect(() => {
		getSections();
	}, []);

	useEffect(() => {
		if (sections.length) {
			setLoading(false);
		}
	});

	useEffect(() => {
		if (open) {
			counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
		}
	}, [counter, open]);

	const handleDialogOpen = (props) => {
		setDialogIsOpen(true);
		setSelectedRowId(props.id);
	};

	const handleDialogClose = () => {
		setDialogIsOpen(false);
	};

	/**
	 * Deletes the user from the database.
	 */
	function DeleteSection() {
		axios({
			method: "DELETE",
			url: `/api/courses/${selectedRowId}/`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			getSections();
		});

		setDialogIsOpen(false);
	}

	/**
	 * Returns the section of the user.
	 * 
	 * @param {*} params 
	 * @returns The section of the user.
	 */
	function getSectionValue(params) {
		let sectionValue = '';
		

		sections.forEach((section) => {
			if (params.id == section.id) {
				sectionValue = section.section;
			}
		});

		return sectionValue;
	}

	const columns = [

		{
			field: "course_id_id",
			headerName: "Section",
			width: 150,
			valueGetter: getSectionValue,
		},
		{
			field: "View",
			width: 60,
			headerAlign: "center",
			align: "center",
			renderCell: (cellValues) => {
				return (
					<Link href={`/section/view?courseId=${cellValues.row.id}`}>
						<ListItemButton>
							<VisibilityIcon />
						</ListItemButton>
					</Link>
				)
			},
		},
		{
			field: "Edit",
			width: 60,
			headerAlign: "center",
			align: "center",
			renderCell: (cellValues) => {
				return (
					<div>
						{
							(() => {
								
								return (<Link href={`/section/edit?courseId=${cellValues.row.id}`}>
								<ListItemButton>
									<EditIcon />	
								</ListItemButton>
							</Link>)
							})()
						}
					</div>
				);
			},
		},
		{
			field: "Delete",
			width: 75,
			headerAlign: "center",
			align: "center",
			renderCell: (cellValues) => {
				return (

					<Link
						onClick={() => {
							handleDialogOpen({ id: cellValues.row.id });
						}}>
						<ListItemButton>
							<DeleteIcon />
						</ListItemButton>
					</Link>
				);
			},
		},
	];

	document.title = "All Sections " + "- PiXELL-River";

	return (
		<>
			{loading ? (
				<div className="spinner">
					{counter !== 0 ? (
						<>
							<span>Loading. . .</span>
							<div className="half-spinner"></div>
						</>
					) : (
						<h1>No Sections Found</h1>
					)}
				</div>
			) : (
				<div style={{ height: 800, width: "100%" }}>
					<DataGrid
						rows={sections}
						getRowId={(sections) => sections.id}
						columns={columns}
						pageSize={15}
						rowsPerPageOptions={[10]}
						disableSelectionOnClick
						initialState={{
							sorting: {
								sortModel: [
									{
										field: "sectionId",
										sort: "desc",
									},
								],
							},
						}}
					/>
					{dialogIsOpen && <ConfirmModal title="Delete Section" message="Are you sure you want to delete section?" selectedRowId={selectedRowId} onCancel={handleDialogClose} onConfirm={DeleteSection} />}
				</div>
			)}
		</>
	);
}

export default SectionDataGrid;
