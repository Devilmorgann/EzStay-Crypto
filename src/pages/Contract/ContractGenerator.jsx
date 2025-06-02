import React, { useState, useEffect } from 'react';

const ContractGenerator = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');
  const [contractCode, setContractCode] = useState('');
  const [savedContracts, setSavedContracts] = useState([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showSaved, setShowSaved] = useState(false); // 🔄 toggle state

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('contracts')) || [];
    setSavedContracts(saved);
  }, []);

  const isValid = () => {
    const symbolRegex = /^[A-Z0-9]{1,10}$/;
    const nameRegex = /^[a-zA-Z0-9 ]{1,30}$/;

    if (!nameRegex.test(name)) {
      setError('❌ Token name can only have letters, numbers and spaces.');
      return false;
    }
    if (!symbolRegex.test(symbol)) {
      setError('❌ Symbol must be UPPERCASE letters and numbers only (1-10 chars).');
      return false;
    }
    if (isNaN(supply) || supply <= 0) {
      setError('❌ Supply must be a positive number.');
      return false;
    }

    setError('');
    return true;
  };

  const generateCode = () => {
    if (!isValid()) return;

    const code = `
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract ${name.replace(/\s+/g, '')} is ERC20, Pausable {
    address private owner;

    constructor() ERC20("${name}", "${symbol}") {
        owner = msg.sender;
        _mint(msg.sender, ${supply} * 10 ** decimals());
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal whenNotPaused override {
        super._beforeTokenTransfer(from, to, amount);
    }
}
`;
    setContractCode(code);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadContract = () => {
    const blob = new Blob([contractCode], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = `${name.replace(/\s+/g, '')}.sol`;
    link.href = window.URL.createObjectURL(blob);
    link.click();
  };

  const saveContract = () => {
    const contract = { name, symbol, supply, code: contractCode };
    const updated = [...savedContracts, contract];
    setSavedContracts(updated);
    localStorage.setItem('contracts', JSON.stringify(updated));
  };

  const deleteContract = (index) => {
    const updated = [...savedContracts];
    updated.splice(index, 1);
    setSavedContracts(updated);
    localStorage.setItem('contracts', JSON.stringify(updated));
  };

  const styles = {
    container: {
      maxWidth: '700px',
      margin: '40px auto',
      padding: '30px',
      borderRadius: '12px',
      backgroundColor: '#fefefe',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '25px',
      fontSize: '24px',
      fontWeight: '600',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '16px',
      fontSize: '15px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '14px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: '0.3s',
      marginBottom: '10px',
    },
    copyButton: {
      marginRight: '10px',
      backgroundColor: '#28a745',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      border: 'none',
    },
    saveButton: {
      backgroundColor: '#ffc107',
      color: '#000',
    },
    downloadButton: {
      backgroundColor: '#17a2b8',
      color: '#fff',
    },
    error: {
      color: 'red',
      fontWeight: '500',
      marginTop: '10px',
    },
    codeBlock: {
      marginTop: '20px',
      backgroundColor: '#000',
      color: '#00ff88',
      padding: '15px',
      borderRadius: '10px',
      fontFamily: 'Courier New, monospace',
      fontSize: '14px',
      whiteSpace: 'pre-wrap',
      overflowX: 'auto',
      border: '1px solid #333',
    },
    linksBox: {
      marginTop: '20px',
      backgroundColor: '#f9f9f9',
      padding: '15px',
      borderRadius: '10px',
      lineHeight: '1.6',
      color: '#222',
    },
    link: {
      display: 'block',
      color: '#007bff',
      textDecoration: 'none',
      marginBottom: '8px',
    },
    savedContracts: {
      marginTop: '30px',
      backgroundColor: 'black',
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      border: '1px solid #ddd',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛠 Smart Contract Generator</h2>

      <input
        style={styles.input}
        placeholder="Token Name (e.g. MyToken)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Symbol (e.g. MTK)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Initial Supply (e.g. 1000)"
        type="number"
        value={supply}
        onChange={(e) => setSupply(e.target.value)}
      />

      <button style={styles.button} onClick={generateCode}>🚀 Generate Contract</button>

      {error && <p style={styles.error}>{error}</p>}

      {contractCode && (
        <div>
          <h3 style={{ marginTop: '30px', color: 'black' }}>✅ Generated Contract:</h3>
          <pre style={styles.codeBlock}>{contractCode}</pre>
          <div style={{ marginTop: '10px' }}>
            <button style={styles.copyButton} onClick={copyToClipboard}>
              {copied ? '📋 Copied!' : '📋 Copy'}
            </button>
            <button style={{ ...styles.copyButton, ...styles.downloadButton }} onClick={downloadContract}>
              ⬇️ Download
            </button>
            <button style={{ ...styles.copyButton, ...styles.saveButton }} onClick={saveContract}>
              💾 Save
            </button>
          </div>

          <div style={styles.linksBox}>
            <h4>🔗 Useful Links:</h4>
            <a style={styles.link} href="https://soliditylang.org/" target="_blank">Solidity Docs</a>
            <a style={styles.link} href="https://remix.ethereum.org/" target="_blank">Remix IDE</a>
            <a style={styles.link} href="https://docs.soliditylang.org/en/latest/layout-of-source-files.html#version-pragma" target="_blank">Versioning Guide</a>
          </div>

          <div style={styles.savedContracts}>
            <h4
              style={{ cursor: 'pointer', marginBottom: '10px' }}
              onClick={() => setShowSaved(!showSaved)}
            >
              📂 Saved Contracts {showSaved ? '▲' : '▼'}
            </h4>

            {showSaved && (
              savedContracts.length === 0 ? (
                <p>No contracts saved yet.</p>
              ) : (
                savedContracts.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#111',
                      padding: '10px',
                      borderRadius: '8px',
                    }}
                  >
                    <div>
                      <strong>{c.name}</strong> ({c.symbol}) — Supply: {c.supply}
                    </div>
                    <button
                      onClick={() => deleteContract(i)}
                      style={{
                        marginLeft: '10px',
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      ❌
                    </button>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractGenerator;
