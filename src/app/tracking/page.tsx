"use client";

import { useEffect, useState } from "react";
import Card from "@/components/dashboard/Card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { updates } from "@/data/dashboard";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { devicesApi, ordersApi, type Device } from "@/lib/api";
import toast from "react-hot-toast";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 30.0444,
  lng: 31.2357,
};

export default function TrackingPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchDevices();
    // Check if user is admin from localStorage
    const userRole = localStorage.getItem("user_role");
    setIsAdmin(userRole === "admin");
  }, []);

const orders = [
  {
    id: '#35787588',
    status: 'Delivery',
    from: 'مدينة السماد، طلخا',
    to: 'جامعة المنصورة',
    customer: 'Ahmed Ahmed',
    note: 'Customer',
  },
  {
    id: '#87686588',
    status: 'Pending',
    from: 'مدينة السماد، طلخا',
    to: 'حي توريل، المنصورة',
    customer: 'Omar Khaled',
    note: 'Customer',
  },
  {
    id: '#96870980',
    status: 'Transit',
    from: 'مدينة السماد، طلخا',
    to: 'المشاية السفلية، المنصورة',
    customer: 'Amr Samir',
    note: 'Customer',
  },
];

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const data = await devicesApi.getDevices();
      setDevices(data.devices);
      if (data.devices.length > 0) {
        setSelectedDevice(data.devices[0]);
        if (data.devices[0].lastLocation) {
          setMapCenter({
            lat: data.devices[0].lastLocation.lat,
            lng: data.devices[0].lastLocation.lng,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching devices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
    if (device.lastLocation) {
      setMapCenter({
        lat: device.lastLocation.lat,
        lng: device.lastLocation.lng,
      });
    }
  };

  const handleDelivered = async (orderId: string) => {
    try {
      await ordersApi.markAsDelivered(orderId);
      toast.success("Order marked as delivered");
    } catch (error) {
      console.error("Error marking order as delivered:", error);
      toast.error(error instanceof Error ? error.message : "Failed to mark order as delivered");
    }
  };

  return (
    <DashboardLayout title="Tracking Delivery">
      <div className="tracking-grid">
        <div className="orders-column">
          {/* Active Devices Card */}
          <Card className="order-card dash-card"  >
            <div className="order-header">
              <strong className="order-id">Active Devices</strong>
              <span className="badge">{devices.length}</span>
            </div>
            <div style={{ padding: "16px 0" }}>
              {loading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>Loading devices...</div>
              ) : devices.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>No devices found</div>
              ) : (
                devices.map((device) => (
                  <div
                    key={device._id}
                    onClick={() => handleDeviceSelect(device)}
                    style={{
                      padding: "12px",
                      marginBottom: "8px",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      cursor: "pointer",
                      backgroundColor: selectedDevice?._id === device._id ? "#f5f5f5" : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h4 style={{ margin: "0 0 4px 0", fontSize: "14px" }}>{device.deviceName}</h4>
                        <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                          Status: <span style={{ 
                            color: device.status === "active" ? "green" : "orange",
                            fontWeight: "bold"
                          }}>{device.status}</span>
                        </p>
                        {device.lastLocation && (
                          <p style={{ margin: "4px 0 0 0", fontSize: "11px", color: "#999" }}>
                            {device.lastLocation.lat.toFixed(4)}, {device.lastLocation.lng.toFixed(4)}
                          </p>
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "10px",
                          backgroundColor: device.isActive ? "#e8f5e9" : "#fff3e0",
                          color: device.isActive ? "#2e7d32" : "#e65100"
                        }}>
                          {device.isActive ? "Active" : "Inactive"}
                        </span>
                        <button
                          className="icon-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelivered(device.currentOrder);
                          }}
                          title="Mark as delivered"
                          style={{
                            padding: "6px",
                            background: "#FE9F30",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            color: "white",
                            fontSize: "12px"
                          }}
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Orders List */}
          {(isAdmin ? orders : orders.filter(o => o.status === 'Delivery')).map((o) => (
            <Card key={o.id} className="order-card">
              <div className="order-header">
                <strong className="order-id">{o.id}</strong>
                <span className={`badge ${o.status.toLowerCase()}`}>{o.status}</span>
              </div>

              <div className="order-body">
                <div className="progress-line">
                  <span className="dot start" />
                  <span className="line" />
                  <img src="/images/car-deliver.png" alt="robot" className="robot-mini" />
                  <span className="dot end" />
                </div>

                <div className="addresses">
                  <div className="addr from">{o.from}</div>
                  <div className="addr to">{o.to}</div>
                </div>
              </div>

              <div className="order-footer">
                <div className="customer">
                  <img src="/images/avatar-placeholder.png" alt="avatar" className="avatar" />
                  <div>
                    <div className="name">{o.customer}</div>
                    <div className="role">{o.note}</div>
                  </div>
                </div>
                <div className="contacts">
                  <button 
                    className="icon-btn"
                    onClick={() => handleDelivered(o.id.replace('#', ''))}
                    title="Mark as delivered"
                  >
                    <i className="fa-solid fa-check"></i>
                  </button>
                  <button className="icon-btn"><i className="fa-solid fa-phone"></i></button>
                  <button className="icon-btn"><i className="fa-solid fa-envelope"></i></button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="map-card large-map">
          <div className="map-toolbar">
            <div>
              <h2>Live delivery map</h2>
              <p>{selectedDevice ? `${selectedDevice.deviceName} • Last seen: ${new Date(selectedDevice.lastSeen).toLocaleString()}` : "Select a device to view location"}</p>
            </div>
            <span className="live-pill">Live</span>
          </div>
          <div style={{ position: "relative", minHeight: "400px" }}>
            {GOOGLE_MAPS_API_KEY ? (
              <LoadScript 
                googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                onLoad={() => setIsMapLoaded(true)}
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={14}
                >
                  {selectedDevice && selectedDevice.lastLocation && isMapLoaded && (
                    <Marker
                      position={{
                        lat: selectedDevice.lastLocation.lat,
                        lng: selectedDevice.lastLocation.lng,
                      }}
                      icon={
                        window.google && window.google.maps
                          ? {
                              url: "/images/car-deliver.png",
                              scaledSize: new window.google.maps.Size(40, 40),
                            }
                          : undefined
                      }
                      title={selectedDevice.deviceName}
                    />
                  )}
                </GoogleMap>
              </LoadScript>
            ) : (
              <div style={{ 
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                padding: "20px",
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                maxWidth: "400px"
              }}>
                <h4 style={{ margin: "0 0 12px 0" }}>Google Maps API Key Required</h4>
                <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#666" }}>
                  To enable the real map, add your Google Maps API key to your environment variables:
                </p>
                <code style={{ 
                  display: "block", 
                  padding: "8px", 
                  backgroundColor: "#f5f5f5", 
                  borderRadius: "4px",
                  fontSize: "12px",
                  marginBottom: "12px"
                }}>
                  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
                </code>
                {selectedDevice && selectedDevice.lastLocation && (
                  <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
                    <p style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "bold" }}>{selectedDevice.deviceName}</p>
                    <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                      Lat: {selectedDevice.lastLocation.lat.toFixed(6)}<br />
                      Lng: {selectedDevice.lastLocation.lng.toFixed(6)}
                    </p>
                    <a 
                      href={`https://www.google.com/maps?q=${selectedDevice.lastLocation.lat},${selectedDevice.lastLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: "8px",
                        padding: "6px 12px",
                        backgroundColor: "#FE9F30",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "4px",
                        fontSize: "12px"
                      }}
                    >
                      View on Google Maps
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
