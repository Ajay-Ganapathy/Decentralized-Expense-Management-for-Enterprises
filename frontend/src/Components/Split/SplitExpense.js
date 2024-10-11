import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus , trash } from '../../utils/Icons';
import Swal from 'sweetalert2'; // Import SweetAlert


function SplitExpense() {
    const { addExpense } = useGlobalContext();
    const [inputState, setInputState] = useState({
        project: '',
        totalAmount: '',
        splitType: 'equal', // default to equal split
        selectedCompanies: [], // store selected companies
        companies: {}, // store company expenses here
        date: '',
        description: '',
    });

    const { project, totalAmount, splitType, selectedCompanies, companies, date, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
    };

    const handleProjectChange = e => {
        const selectedProject = e.target.value;
        setInputState({
            ...inputState,
            project: selectedProject,
            selectedCompanies: [],
            companies: {},
        });
    };

    const handleSplitTypeChange = e => {
        setInputState({ ...inputState, splitType: e.target.value });
    };

    const handleCompanyExpenseChange = (company, value) => {
        setInputState({
            ...inputState,
            companies: { ...companies, [company]: value },
        });
    };

    const addCompany = (e) => {
        e.preventDefault();
        const selectedCompany = document.getElementById('company-select').value;
        if (selectedCompany && !selectedCompanies.includes(selectedCompany)) {
            setInputState({
                ...inputState,
                selectedCompanies: [...selectedCompanies, selectedCompany],
            });
        }
    };

    const removeCompany = (companyToRemove) => {
        setInputState({
            ...inputState,
            selectedCompanies: selectedCompanies.filter(company => company !== companyToRemove),
            companies: Object.keys(companies).reduce((acc, company) => {
                if (company !== companyToRemove) {
                    acc[company] = companies[company];
                }
                return acc;
            }, {}),
        });
    };

    const validatePartialSplit = () => {
        const totalSplitAmount = Object.values(companies).reduce((acc, val) => acc + parseFloat(val || 0), 0);
        return totalSplitAmount === parseFloat(totalAmount);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (splitType === 'partial' && !validatePartialSplit()) {
            await Swal.fire({
                icon: 'error',
                title: 'Enter correct individual expenses of companies',
                text: `Total allocated expenses must equal ${totalAmount}`,
            });
            return;
        }

        let expensesToAdd = [];
        if (splitType === 'equal') {
            const equalShare = totalAmount / selectedCompanies.length;

            for (const company of selectedCompanies) {
                expensesToAdd.push({
                    company,
                    amount: equalShare,
                    date,
                    description,
                });
            }
        } else {
            for (const company of selectedCompanies) {
                expensesToAdd.push({
                    company,
                    amount: companies[company],
                    date,
                    description,
                });
            }
        }

        expensesToAdd.forEach(expense => addExpense(expense));

        await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Expenses have been successfully split!',
        });

        setInputState({
            project: '',
            totalAmount: '',
            splitType: 'equal',
            selectedCompanies: [],
            companies: {},
            date: '',
            description: '',
        });
    };

    // Dummy data for projects and collaborating companies
    const allCompanies = ['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5', 'Company 6', 'Company 7', 'Company 8', 'Company 9', 'Company 10'];

    return (
        <SplitExpenseStyled onSubmit={handleSubmit}>
            <div style={{ margin: "2rem" }}>
                <div className="input-control" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                    <select required value={project} onChange={handleProjectChange}>
                        <option value="" disabled>Select Project</option>
                        {/* Example projects */}
                        <option value="Project A">Project A</option>
                        <option value="Project B">Project B</option>
                    </select>
                </div>

                <div className="input-control" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                    <input
                        type="number"
                        value={totalAmount}
                        placeholder="Total Expenses"
                        onChange={handleInput('totalAmount')}
                    />
                </div>

                <div style={{ marginTop: "2rem", marginBottom: "2rem" }} className="split-type input-control">
                    <label>
                        <input
                            type="radio"
                            value="equal"
                            checked={splitType === 'equal'}
                            onChange={handleSplitTypeChange}
                        />
                        Split Equally
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="partial"
                            checked={splitType === 'partial'}
                            onChange={handleSplitTypeChange}
                        />
                        Split Partially
                    </label>
                </div>

                {/* Dropdown to add companies */}
                <div className="input-control" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                    <select id="company-select">
                        <option value="" disabled>Select Company</option>
                        {allCompanies.filter(company => !selectedCompanies.includes(company)).map((company, index) => (
                            <option key={index} value={company}>{company}</option>
                        ))}
                    </select>
                    
                    <Button icon={plus} 
                            bPad={'1rem'}
                            bRad={'50%'}
                            bMar={'1rem'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'} onClick={addCompany} />
                </div>

                {/* Selected companies list */}
                <div className="companies input-control" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                    {selectedCompanies.map((company, index) => (
                        <div key={index}>
                            <label>{company}</label>
                            {splitType === 'partial' ? (
                                <input
                                    type="number"
                                    placeholder="Enter Amount"
                                    value={companies[company] || ''}
                                    onChange={e => handleCompanyExpenseChange(company, e.target.value)}
                                />
                            ) : (
                                <input
                                    type="number"
                                    value={totalAmount / selectedCompanies.length}
                                    readOnly
                                />
                            )}
                           
                             <Button  icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'} onClick={() => removeCompany(company)} />
                            
                        </div>
                    ))}
                </div>

                <div className="input-control" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                    <DatePicker
                        id='date'
                        placeholderText='Enter A Date'
                        selected={date}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => {
                            setInputState({ ...inputState, date: date });
                        }}
                    />
                </div>

                <div className="input-control" style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                    <textarea
                        name="description"
                        value={description}
                        placeholder='Add A Reference'
                        id="description"
                        cols="30"
                        rows="4"
                        onChange={handleInput('description')}
                    ></textarea>
                </div>

                <div className="submit-btn">
                    <Button
                        name={'Split Expense'}
                        icon={plus}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--color-accent)'}
                        color={'#fff'}
                    />
                </div>
            </div>
        </SplitExpenseStyled>
    );
}

const SplitExpenseStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control {
        input {
            width: 100%;
        }
    }
    .split-type {
        display: flex;
        gap: 2rem;
        label {
            display: flex;
            align-items: center;
        }
    }
    .companies {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        label {
            font-weight: bold;
        }
        input {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }
    }
`;

export default SplitExpense;
