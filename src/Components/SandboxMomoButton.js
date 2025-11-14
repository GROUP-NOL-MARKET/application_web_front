
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import API from './Authentification/api';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function SandboxMomoButton({ amount }) {
    const [ref, setRef] = useState(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const createPayment = async () => {
        setLoading(true);
        try {
            const res = await API.post('/sandbox/payments/create', { amount });
            if (res.data.ok) {
                setRef(res.data.reference);
                setStatus('processing');
            } else {
                setStatus('failed');
            }
        } catch (e) {
            console.error(e);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    // Polling du statut
    useEffect(() => {
        if (!ref) return;

        let isMounted = true; // éviter les updates après cleanup

        const poll = async () => {
            try {
                const res = await API.get(`/sandbox/payments/status/${ref}`);
                const newStatus = res.data.status;

                if (!isMounted) return;

                setStatus(newStatus);

                //Si terminé → toast + redirection + stop polling
                if (['approved', 'declined', 'failed'].includes(newStatus)) {
                    if (newStatus === 'approved') {
                        toast.success("Paiement approuvé !");
                    } else if (newStatus === 'declined') {
                        toast.error("Paiement refusé !");
                    } else {
                        toast.error("Paiement échoué !");
                    }

                    navigate('/');
                    return; // STOP ici. On ne relance plus le polling.
                }

                // Si toujours processing
                setTimeout(poll, 3000);

            } catch (err) {
                console.log("Erreur polling :", err);
                if (isMounted) setTimeout(poll, 3000);
            }
        };

        // Démarrage du premier poll
        poll();

        return () => {
            // Cleanup: on arrête tout
            isMounted = false;
        };
    }, [ref]);



    return (
        <div style={{ padding: 20 }}>
            <Button onClick={createPayment} disabled={loading} className="rounded-3 bg-success">
                {status === "processing" && loading ? <Spinner animation='border' /> : `Payer ${amount} FCFA`}
            </Button>
        </div>
    );
}
