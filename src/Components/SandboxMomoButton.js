import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Alert } from "react-bootstrap";
import API from './Authentification/api';
import { toast } from 'react-toastify';

export default function SandboxMomoButton({ amount }) {
    const [phone, setPhone] = useState(""); // numéro MTN 10 chiffres
    const [refId, setRefId] = useState(null);
    const [txId, setTxId] = useState(null);
    const [status, setStatus] = useState('idle');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();

    const pollingRef = useRef({ cancelled: false, attempts: 0 });
    const MAX_POLL_ATTEMPTS = 100;
    const POLL_INTERVAL_MS = 3000;

    // Validation MTN BENIN (10 chiffres : 01 + indicatif + 6 chiffres)
    const isValidPhone = (num) => {
        return /^01(61|62|66|67|90|91|96|97|52)[0-9]{6}$/.test(num);
    };

    const createPayment = async () => {
        if (!isValidPhone(phone)) {
            toast.error("Veuillez entrer un numéro MTN MoMo valide (10 chiffres).");
            return;
        }

        setLoading(true);
        setErrorMsg(null);
        setStatus('processing');
        pollingRef.current.cancelled = false;
        pollingRef.current.attempts = 0;

        try {
            const res = await API.post('/momo/create', {
                amount,
                partyId: phone
            });

            if (res?.data?.ok) {
                setRefId(res.data.reference || null);
                setTxId(res.data.transaction_id || null);
                setStatus('processing');
                toast.info('Demande envoyée — validez le paiement sur votre téléphone.');
            } else {
                setStatus('failed');
                setErrorMsg(res?.data?.error || 'Erreur init paiement');
                toast.error('Impossible d’initier le paiement.');
            }
        } catch (e) {
            console.error('createPayment error', e);
            setStatus('error');
            setErrorMsg(e?.response?.data || e.message);
            toast.error('Erreur réseau.');
        } finally {
            setLoading(false);
        }
    };

    // Polling du statut
    useEffect(() => {
        if (!refId) return;

        let isMounted = true;

        const poll = async () => {
            if (!isMounted || pollingRef.current.cancelled) return;

            try {
                pollingRef.current.attempts += 1;

                if (pollingRef.current.attempts > MAX_POLL_ATTEMPTS) {
                    setStatus('failed');
                    setErrorMsg("Délai dépassé, réessayez.");
                    toast.warning("Temps dépassé.");
                    return;
                }

                const res = await API.get(`/momo/status/${refId}`);
                const newStatus = res?.data?.status || 'unknown';

                const normalized = String(newStatus).toLowerCase();
                setStatus(normalized);

                if (normalized === 'approved') {
                    toast.success("Paiement approuvé !");
                    pollingRef.current.cancelled = true;
                    setTimeout(() => navigate('/'), 1000);
                    return;
                }

                if (normalized === 'declined' || normalized === 'failed') {
                    const meta = res?.data?.meta || {};
                    const reason = (meta?.reason || meta?.message || '').toLowerCase();

                    if (reason.includes("insuff")) {
                        toast.error("Solde insuffisant.");
                        setErrorMsg("Solde insuffisant.");
                    } else {
                        toast.error("Paiement refusé.");
                        setErrorMsg("Paiement refusé.");
                    }

                    pollingRef.current.cancelled = true;
                    setTimeout(() => navigate('/'), 1500);
                    return;
                }

                setTimeout(poll, POLL_INTERVAL_MS);

            } catch (err) {
                console.log("poll error", err);
                if (!pollingRef.current.cancelled) {
                    setTimeout(poll, POLL_INTERVAL_MS);
                }
            }
        };

        poll();

        return () => {
            isMounted = false;
            pollingRef.current.cancelled = true;
        };
    }, [refId, navigate]);


    return (
        <div style={{ padding: 20 }}>

            {/* Formulaire MoMo */}
            <div
                style={{
                    background: '#f8f8f8',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 15,
                    border: '1px solid #ddd'
                }}
            >
                <label style={{ fontWeight: 'bold', marginBottom: 5 }}>Numéro MTN MoMo</label>

                <input
                    type="tel"
                    maxLength="10"
                    className="form-control"
                    placeholder="Ex: 0197000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    style={{
                        fontSize: 18,
                        padding: 12,
                        borderRadius: 8,
                        border: "1px solid #ccc"
                    }}
                />

                <small style={{ color: "#777" }}>
                    Entrez votre numéro MTN (10 chiffres, commence par 01 + indicatif).
                </small>
            </div>

            {txId && <div style={{ marginBottom: 8 }}>Transaction : <strong>{txId}</strong></div>}
            {status !== 'idle' && status !== 'processing' && errorMsg && (
                <Alert variant="danger"> {errorMsg?.error || (typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg))}</Alert>
            )}

            <Button
                onClick={createPayment}
                disabled={loading || status === 'processing'}
                className="rounded-3 bg-success w-100"
                style={{ padding: 12, fontSize: 18 }}
            >
                {loading || status === "processing"
                    ? <><Spinner animation='border' size="sm" /> Traitement…</>
                    : `Payer ${amount} FCFA`
                }
            </Button>

            {status === 'processing' && (
                <div style={{ marginTop: 10 }}>
                    <small>En attente — vérification automatique toutes les 3s…</small>
                </div>
            )}
        </div>
    );
}
