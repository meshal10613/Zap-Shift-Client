// src/pages/Coverage.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
import { useState } from 'react';

// Helper component to move map
function FlyToDistrict({coords }) {
    const map = useMap();
    if (coords) {
        map. flyTo(coords, 10, { duration: 1.5 });
    }
    return null;
}

const Coverage = () => {
    const warehouses = useLoaderData();
    const [search, setSearch] = useState("");
    const [activeCoords, setActiveCoords] = useState(null);
    const [activeDistrict, setActiveDistrict] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const district = warehouses.find(d => d.district.toLowerCase().includes(search.toLowerCase()));
        if(district){
            setActiveCoords([district.latitude, district.longitude]);
            setActiveDistrict(district.district);
        }
    };

    return (
        <div className="py-20 px-5 md:px-20 max-w-8xl mx-auto bg-white rounded-2xl">
            <h2 className="text-5xl font-bold mb-6">We are available in 64 districts</h2>

            {/* Search box */}
            <form onSubmit={handleSearch} className="join w-full mb-6">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input join-item rounded-l-full h-12" name='search' placeholder="Search here" />
                <button type='submit' className="btn btn-primary text-black join-item rounded-r-full h-12">Search</button>
            </form>

            <div className="divider"></div>

            <h2 className='text-3xl font-semibold my-5'>We deliver almost all over Bangladesh</h2>

            {/* Map Section */}
            <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
                <MapContainer
                center={[24.25, 89.92]} // Approx. center of Bangladesh
                zoom={7}
                scrollWheelZoom={false}
                className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <FlyToDistrict coords={activeCoords}/>
                    {/* <Marker position={[23.8103, 90.4125]}>
                        <Popup>Dhaka - Head Office</Popup>
                    </Marker> */}
                    {
                        warehouses.map((wh, index) => (
                            <Marker key={index} position={[wh.latitude, wh.longitude]}>
                                <Popup autoClose={wh.district === activeDistrict}>
                                    <strong>{wh.district}</strong><br />
                                    {wh.covered_area.join(",")}
                                </Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;
